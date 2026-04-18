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

export default function AjoutMenu() {

    const [nom, setNom] = useState();
    const [categorie, setCategorie] = useState();
    const [prix, setPrix] = useState();
    const [description, setDescription] = useState();

    const handleAjout = async () => {
        try {
            await axios.post("http://192.168.0.13:8080/menus/add",
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
            console.error("Erreur lors de l'ajout du menu.")
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
                        <Label htmlFor="genre">Catégorie</Label>
                        <Input type="text" autoComplete='none' id="genre" onChange={(e) => setCategorie(e.target.value)}  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="quantity">Plat</Label>
                        <Input type="text" autoComplete='none' id="quantity" onChange={(e) => setNom(e.target.value)}  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="address">Prix</Label>
                        <Input type="number" autoComplete='none' id="address" onChange={(e) => setPrix(e.target.value)}  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="address">Description</Label>
                        <Input type="text" autoComplete='none' id="address" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button className='text-white' size='sm' variant='rafane' type="submit" onClick={handleAjout} >Ajouter</Button>
                    <Button size='sm' variant='destructive' type="button" >Annuler</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}
