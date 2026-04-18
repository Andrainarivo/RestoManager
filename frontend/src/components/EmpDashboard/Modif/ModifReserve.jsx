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

export default function ModifReserve({id}) {

    const [date, setDate] = useState();
    const [heure, setHeure] = useState();
    const [client_id, setClient] = useState();
    const [nombre_personne, setNombre] = useState();

    useEffect(()=>{
        fetchReservationById();
    }, [])

    const fetchReservationById = async () => {
        try {
            const result = await axios.get(`http://192.168.0.13:8080/reservations/get/${id}`,
                { headers: { 'Authorization': token() } }
            );
            console.log(result.data);
            setDate(result.data[0].date);
            setHeure(result.data[0].heure);
            setClient(result.data[0].client_id);
            setNombre(result.data[0].nombre_personne);
        } catch (error) {
            console.error("Erreur lors de la récupération par Id:", error);
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://192.168.0.13:8080/reservations/maj/${id}`,
                {
                    date, heure, client_id, nombre_personne
                },
                {
                    headers: {
                        'Authorization': token()
                    }
                }
            );
            window.location.href="/employe-dashboard/reservation";
        } catch (error) {
            console.error("Erreur lors de la modification de réservation", error)
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
                    <DialogTitle>Modifier une réservation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="genre">identifiant</Label>
                        <Input type="email" autoComplete='none' value={client_id}  onChange={(e) => setClient(e.target.value)}  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label >Date</Label>
                        <Input type="date" autoComplete='none' value={date}  onChange={(e) => setDate(e.target.value)}  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="quantity">Heure</Label>
                        <Input type="time" autoComplete='none' value={heure}  onChange={(e) => setHeure(e.target.value)}  />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="address">Nombre</Label>
                        <Input type="number" autoComplete='none' value={nombre_personne} onChange={(e) => setNombre(e.target.value)}  />
                    </div>
                </div>
                <DialogFooter>
                    <Button className='text-white' size='sm' variant='rafane' onClick={handleUpdate}  >Modifier</Button>
                    <Button size='sm' variant='destructive' type="button"  >Annuler</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}
