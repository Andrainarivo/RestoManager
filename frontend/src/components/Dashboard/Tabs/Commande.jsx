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
import AjoutCom from '../Modal/AjoutCom';
import axios from 'axios';
import DelCom from '../Delete/DelCom';




const Commande = () => {

    const [com, setCom] = useState([]);
    
    useEffect(()=>{

        const fetchCom = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (token) {
                  const result = await axios.get("http://localhost:8080/clients/commandes/get", {
                    headers: {
                      'Authorization': `${token}`
                    }
                  });
                  setCom(result.data);
                } else {
                  console.error("Token not found in localStorage");
                }
              } catch (error) {
                console.error("Erreur de la recuperation de commandes", error);
              }
            
        }

        fetchCom();

    }, [])

  return (
    <div className='px-5 py-3'>
        <p className='text-xl text-neutral-700'>Liste de commandes</p>
        <img className=' rounded-md' src={biby} alt="elevage image" />
        <div className="flex  mb-3">
            <AjoutCom/>
        </div>
        
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Menu</TableHead>
                  <TableHead className="w-[100px]">Genre</TableHead>
                  <TableHead className="text-center">Quantité</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {
                    com.map((res, index)=>(
                        <TableRow className="" key={index} >
                        <TableCell className="font-medium">{res.menu_id}</TableCell>
                        <TableCell className="font-medium">{res.genre}</TableCell>
                        <TableCell className="text-center">{res.quantite}</TableCell>
                        <TableCell>{res.adresse_livraison}</TableCell>
                        <TableCell className="">{new Date(res.date).toLocaleDateString()}</TableCell>
    
                    </TableRow>
                    ))
                }

                
            </TableBody>
        </Table>

    </div>
  )
}

export default Commande














