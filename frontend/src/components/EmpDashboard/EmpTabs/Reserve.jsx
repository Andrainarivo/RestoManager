import React, { useEffect, useState } from 'react'
import biby from '../../../images/Capture d’écran (246).png';
import { Button } from '../../ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'
import AjoutRes from '../../Dashboard/Modal/AjoutRes';
import axios from 'axios';
import { date } from 'zod';
import AjoutReserve from '../Ajout/AjoutReserve';
import ModifReserve from '../Modif/ModifReserve';
import DelReserve from '../Delete/DelReserve';
import { token } from '../../Dashboard/Header';

export default function Reserve() {

  const [reserves, setReserves] = useState([]);

  useEffect(()=>{

    const fetchReservation = async () => {
      try {
        const result = await axios.get("http://192.168.0.13:8080/reservations/list",
          {
            headers: {
              'Authorization': token()
            }
          }
        );
        setReserves(result.data);
      } catch (error) {
        console.error("Erreur lors de la récuperation de la réservation", error);
      }
    }

    fetchReservation();

  }, [])

  return (
    <div className='px-5 py-3'>
        <p className='text-xl text-neutral-700'>Liste de réservation</p>
        <img className=' rounded-md' src={biby} alt="elevage image" />
        <div className="flex  mb-3">
            <AjoutReserve/>
        </div>
        
        <Table>
            <TableCaption>liste recente de réservation.</TableCaption>
            <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="text-center">Heure</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {
                  reserves.map((reserve, index)=>(
                    <TableRow className=""  >
                        <TableCell className="font-medium"> {new Date(reserve.date).toLocaleDateString()} </TableCell>
                        <TableCell className="text-center"> {reserve.heure} </TableCell>
                        <TableCell> {reserve.nombre_personne} </TableCell>
                        <TableCell className=""> {reserve.status}  </TableCell>
                        <TableCell className=" flex gap-3 justify-center">
                            <ModifReserve id={reserve.reservation_id} />
                            <DelReserve id={reserve.reservation_id} />
                        </TableCell>
                    </TableRow>
                  ))
                }

            </TableBody>
        </Table>

    </div>
  )
}
