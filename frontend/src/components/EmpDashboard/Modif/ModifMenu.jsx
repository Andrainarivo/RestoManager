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
import { Label } from "../../ui/label";
import axios from 'axios';
import { token } from '../../Dashboard/Header';

export default function ModifMenu({id}) {

    const [nom, setNom] = useState();
    const [categorie, setCategorie] = useState();
    const [prix, setPrix] = useState();
    const [description, setDescription] = useState();

    useEffect(()=>{
        fetchMenuById();
    }, [])

    const fetchMenuById = async () => {
        try {
            const result = await axios.get(`http://192.168.0.13:8080/menus/get/${id}`,
                {
                    headers: {
                        'Authorization': token()
                    }
                }
            );
            setNom(result.data[0].nom);
            setCategorie(result.data[0].categorie);
            setPrix(result.data[0].prix);
            setDescription(result.data[0].description);
        } catch (error) {
            console.error("Erreur lors de la récuperation du menu par Id:", error);
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://192.168.0.13:8080/menus/maj/${id}`,
                {
                    nom, prix, categorie, description
                },
                {
                    headers: {
                        'Authorization': token()
                    }
                }
            );
            window.location.href="/employe-dashboard/menu";
        } catch (error) {
            console.error("Erreur lors de la modification du menu.")
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
                    <DialogTitle>Modifier une commande</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="genre">Catégorie</Label>
                        <Input type="text" autoComplete='none' value={categorie} onChange={(e) => setCategorie(e.target.value)} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="quantity">Plat</Label>
                        <Input type="text" autoComplete='none' value={nom} onChange={ (e) => setNom(e.target.value) }  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="address">Prix</Label>
                        <Input type="number" autoComplete='none' value={prix} onChange={ (e) => setPrix(e.target.value) }  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="address">Description</Label>
                        <Input type="text" autoComplete='none' value={description} onChange={ (e) => setDescription(e.target.value) }  />
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
