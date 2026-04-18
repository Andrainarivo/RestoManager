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

export default function AjoutReserve() {

    const [date, setDate] = useState();
    const [heure, setHeure] = useState();
    const [email, setEmail] = useState();
    const [nombre_personne, setNombre] = useState();

    const handleAjout = async () => {
        try {
            await axios.post("http://192.168.0.13:8080/reservations/new",
                {
                    date, heure, email, nombre_personne
                },
                {
                    headers: {
                        'Authorization': token()
                    }
                }
            );
            window.location.href="/employe-dashboard/reservation";
        } catch (error) {
            console.error("Erreur lors de l'ajout de réservation", error)
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
                    <DialogTitle>Ajout une réservation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="genre">Email</Label>
                        <Input type="email" autoComplete='none'  onChange={(e) => setEmail(e.target.value)}  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label >Date</Label>
                        <Input type="date" autoComplete='none'  onChange={(e) => setDate(e.target.value)}  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="quantity">Heure</Label>
                        <Input type="time" autoComplete='none'  onChange={(e) => setHeure(e.target.value)}  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="address">Nombre</Label>
                        <Input type="number" autoComplete='none' onChange={(e) => setNombre(e.target.value)}  />
                    </div>
                </div>
                <DialogFooter>
                    <Button className='text-white' size='sm' variant='rafane' onClick={handleAjout}  >Ajouter</Button>
                    <Button size='sm' variant='destructive' type="button"  >Annuler</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}
