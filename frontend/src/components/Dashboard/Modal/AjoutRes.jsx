import React, { useState } from 'react';
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
  } from "../../ui/dialog"
import { Label } from "../../ui/label";
import axios from 'axios';
import { token } from '../Header';


const AjoutRes = () => {

    const [date, setDate] = useState();
    const [heure, setHeure] = useState();
    const [nombre_personne, setNombre] = useState();

    const handleAjout = async () => {
        await axios.post("http://localhost:8080/clients/reservations/new",
            {
                date, heure, nombre_personne
            },
            {
                headers: {
                    'Authorization': token()
                }
            }
        );
        window.location.href="/dashboard/reservation";
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button size='sm' variant="rafane">Ajouter+</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Ajouter une réservation </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Date</Label>
                    <Input type="date" id="email" placeholder="" value={date} onChange={(e)=>setDate(e.target.value)} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Heure</Label>
                    <Input type="time" id="heure" placeholder="" value={heure} onChange={(e)=>setHeure(e.target.value)} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Nombre</Label>
                    <Input type="number" id="number" placeholder="" value={nombre_personne} onChange={(e)=>setNombre(e.target.value)} />
                </div>
               
            </div>
            <DialogFooter>
            <Button className=' text-white ' size='sm' variant='rafane' type="submit" onClick={handleAjout} >Ajouter</Button>
            <Button   size='sm' variant='destructive' type="submit">Annuler</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default AjoutRes
