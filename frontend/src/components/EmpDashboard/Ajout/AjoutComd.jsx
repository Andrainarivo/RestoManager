import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../ui/dialog";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../../ui/select";
import { Label } from "../../ui/label";
import axios from 'axios';
import { token } from '../../Dashboard/Header';

export default function AjoutComd() {

    const [menu, setMenu] = useState([]);

    const [menu_id, setMenuId] = useState();
    const [client_id, setClient] = useState();
    const [genre, setGenre] = useState();
    const [quantite, setQuantite] = useState();
    const [adresse_livraison, setAdresse_livraison] = useState();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const result = await axios.get("http://192.168.0.13:8080/menus/list");
                const menus = Array.isArray(result.data) ? result.data : [];
                setMenu(menus);
            } catch (error) {
                console.error("Erreur lors de la récupération de menu", error)
            }
        }
        fetchData();
    }, [])

    const handleAjout = async () => {
        try {
            await axios.post("http://192.168.0.13:8080/commandes/new",
                {
                    client_id, menu_id,  genre, quantite, adresse_livraison
                },
                {
                    headers: {
                        'Authorization':  token()
                    }
                }
            );
            window.location.href="/employe-dashboard/commande"
        } catch (error) {
            console.error("Erreur lors de l'ajout de commande:", error);
        }
    }

  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <Button size='sm' variant="rafane">Ajouter+</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ajout une commande</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="genre">Client ID</Label>
                        <Input type="text" autoComplete='none' onChange={(e) => setClient(e.target.value)} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="menu">Menu</Label>
                        <Select onValueChange={(value) => setMenuId(value)} >
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select menu" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select menus</SelectLabel>
                                    {
                                        menu.map((menu, index) => (
                                            <SelectItem value={menu.menu_id.toString()} key={index} >{menu.nom}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="genre">Genre</Label>
                        <Input type="text" autoComplete='none' onChange={(e) => setGenre(e.target.value)} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="quantity">Quantité</Label>
                        <Input type="number" autoComplete='none' onChange={(e) => setQuantite(e.target.value)}  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="address">Adresse</Label>
                        <Input type="text" autoComplete='none' onChange={(e) => setAdresse_livraison(e.target.value)}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button className='text-white' size='sm' variant='rafane' onClick={handleAjout} >Ajouter</Button>
                    <Button size='sm' variant='destructive' type="button">Annuler</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}
