import React, { useEffect, useState } from 'react';
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
import AjoutStock from '../Modal/AjoutCom';
import AjoutRes from '../Modal/AjoutRes';
import axios from 'axios';
import { date } from 'zod';
import DelRes from '../Delete/DelRes';





const Reservation = () => {

    const[reserve, setReserve] = useState([]);

    useEffect(()=>{

        const fetchRes = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (token) {
                  const result = await axios.get("http://localhost:8080/clients/reservations/get", {
                    headers: {
                      'Authorization': `${token}`
                    }
                  });
                  
                  setReserve(result.data);
                } else {
                  console.error("Token not found in localStorage");
                }
              } catch (error) {
                console.error("Erreur de la recuperation de commandes", error);
              }
            
        }

        fetchRes();

    }, [])

  return (
    <div className='px-5 py-3'>
        <p className='text-xl text-neutral-700'>Liste de Réservation</p>
        <img className=' rounded-md' src={biby} alt="elevage image" />
        <div className="flex  mb-3">
            <AjoutRes/>
        </div>
        
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
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
                    
                    reserve.map((res, index)=>(
                        
                        <TableRow className="" key={index} >
                            <TableCell className="font-medium">{new Date(res.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-center">{res.heure}</TableCell>
                            <TableCell>{res.nombre_personne}</TableCell>
                            <TableCell className="">

                                { res.status === 0 ? "en attente" : "Confirmer" }

                            </TableCell>
                            <TableCell className=" flex gap-3 justify-center">
                                {
                                    res.status === 0
                                    ? <p className=" px-3 py-1 cursor-pointer rounded bg-blue-600 ">Confirmer</p>
                                    : <p className=" px-3 py-1 cursor-not-allowed rounded bg-blue-300 text-zinc-700 ">Confirmer</p>
                                }
                                
                                {
                                    res.status === 0 
                                    ? <DelRes id = {res.reservation_id} />
                                    : <p className=" px-3 py-1 cursor-not-allowed rounded bg-red-300 text-zinc-700">Supprimer</p>
                                }
                                
                            </TableCell>
                        </TableRow>
                    ))
                }
                


            </TableBody>
        </Table>

    </div>
  )
}

export default Reservation;