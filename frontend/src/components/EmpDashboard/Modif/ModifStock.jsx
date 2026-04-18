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

export default function ModifStock({id}) {

    const [menu, setMenu] = useState([]);
    const [menu_id, setMenuId] = useState();
    const [quantite_dispo, setQuantite] =useState();

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
        fetchStockById();
    }, [])

    const fetchStockById = async () => {
        try {
            const result = await axios.get(`http://192.168.0.13:8080/stocks/get/${id}`,
                { headers: { 'Authorization': token() } }
            );
            setMenuId(result.data[0].menu_id);
            setQuantite(result.data[0].quantite_dispo);
        } catch (error) {
            console.error("Erreur lors de la récupération du stock par Id:", error);
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://192.168.0.13:8080/stocks/maj/${id}`,

                {
                    menu_id, quantite_dispo
                },
                {
                    headers: {
                        "Authorization": token()
                    }
                }
            );
            window.location.href="/employe-dashboard/stock";
        } catch (error) {
            console.error("Erreur lors de la modification du stock:", error)
        }
    }

  return (
    <div>
      <Dialog>
            <DialogTrigger asChild>
                <Button size='sm' variant="modif">Modifier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifier un stock</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="genre">Menu</Label>
                        <Select value={menu_id} onValueChange={(value) => setMenuId(value)} >
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
                        <Label htmlFor="quantity">Quantité disponible</Label>
                        <Input type="text" autoComplete='none' value={quantite_dispo} onChange={(e) => setQuantite(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button className='text-white' size='sm' variant='rafane' onClick={handleUpdate} >Modifier</Button>
                    <Button size='sm' variant='destructive' type="button">Annuler</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}
