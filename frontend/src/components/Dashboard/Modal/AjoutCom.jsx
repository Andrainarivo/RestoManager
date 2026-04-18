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
import { token } from '../Header';

const AjoutCom = () => {

    const [nom, setMenu] = useState([]);

    const [menu_id, setMenuId] = useState();
    const [genre, setGenre] = useState();
    const [quantite, setQuantite] = useState();
    const [adresse_livraison, setAdresse_livraison] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://localhost:8080/menus/list");
                const menus = Array.isArray(result.data) ? result.data : [];
                setMenu(menus);
            } catch (error) {
                console.error('Erreur lors de la récupération des menu:', error);
                setMenu([]);
            }
        }

        fetchData();
    }, []);

    const handleAjout = async () => {
        try {
            await axios.post("http://localhost:8080/clients/commandes/post",
                {
                    menu_id, genre, quantite, adresse_livraison
                },
                {
                    headers: {
                        'Authorization': token()
                    }
                }
            );
            window.location.href="/dashboard/commande"
        } catch (error) {
            console.error("Erreur lors de l'ajout de la commande.")
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
                            <Label htmlFor="menu">Menu</Label>
                            <Select onValueChange={(value) => setMenuId(value)} >
                                <SelectTrigger className="w-[250px]">
                                    <SelectValue placeholder="Select menu" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select menus</SelectLabel>
                                        {
                                            nom.map((menu, index) => (
                                                <SelectItem value={menu.menu_id.toString()} key={index} >{menu.nom}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="genre">Genre</Label>
                            <Input type="text" autoComplete='none' id="genre" placeholder="" value={genre} onChange={(e)=>setGenre(e.target.value)} />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="quantity">Quantité</Label>
                            <Input type="number" autoComplete='none' id="quantity" placeholder=""value={quantite} onChange={(e)=>setQuantite(e.target.value)} />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="address">Adresse</Label>
                            <Input type="text" autoComplete='none' id="address" placeholder="" value={adresse_livraison} onChange={(e)=>setAdresse_livraison(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className='text-white' size='sm' variant='rafane' type="submit" onClick={handleAjout}>Ajouter</Button>
                        <Button size='sm' variant='destructive' type="button">Annuler</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AjoutCom;
