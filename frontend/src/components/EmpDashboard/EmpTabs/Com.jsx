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
import { date, map } from 'zod';
import AjoutComd from '../Ajout/AjoutComd';
import ModifComd from '../Modif/ModifComd';
import DelComd from '../Delete/DelComd';
import { token } from '../../Dashboard/Header';

export default function Com() {

    const [coms, setComs]  = useState([]);

    useEffect(()=>{

        const fetchCom = async () => {
            try {
                const result = await axios.get("http://192.168.0.13:8080/commandes/list",
                    {
                        headers: {
                            'Authorization': token()
                        }
                    }
                );
                const comArray = Array.isArray(result.data) ? result.data : [];
                setComs(comArray);
            } catch (error) {
                console.error("Erreur lors de la récuperation de commande.", error)
            }
        }

        fetchCom();

    }, [])

  return (
    <div className='px-5 py-3'>
        <p className='text-xl text-neutral-700'>Liste de Commandes</p>
        <img className=' rounded-md' src={biby} alt="elevage image" />
        <div className="flex  mb-3">
            <AjoutComd/>
        </div>
        
        <Table>
            <TableCaption>List recent de commandes.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Menu</TableHead>
                    <TableHead className="w-[100px]">Genre</TableHead>
                    <TableHead className="text-center">Quantité</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead>Date</TableHead>
                <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    coms.map((com, index)=>(
                        <TableRow className="" key={index} >
                            <TableCell className="font-medium"> {com.menu_id} </TableCell>
                            <TableCell className="text-center"> {com.genre} </TableCell>
                            <TableCell> {com.quantite} </TableCell>
                            <TableCell className=""> {com.adresse_livraison}  </TableCell>
                            <TableCell className="font-medium"> {new Date(com.date).toLocaleDateString()} </TableCell>
                            <TableCell className=" flex gap-3 justify-center">
                                <ModifComd id={com.commande_id} />
                                <DelComd id={com.commande_id} />
                            </TableCell>
                        </TableRow>
                    ))
                }
               
            </TableBody>
        </Table>

    </div>
  )
}
