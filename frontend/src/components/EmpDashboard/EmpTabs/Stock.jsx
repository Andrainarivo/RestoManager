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

import axios from 'axios';
import { date } from 'zod';
import AjoutRes from '../../Dashboard/Modal/AjoutRes';
import AjoutStock from '../Ajout/AjoutStock';
import ModifStock from '../Modif/ModifStock';
import DelMenu from '../Delete/DelMenu';
import DelStock from '../Delete/DelStock';
import { token } from '../../Dashboard/Header';

export default function Stock() {

    const [stocks, setStocks] = useState([]);

    useEffect(()=>{
        
        const fetchStock = async () => {
            try {
                const result = await axios.get("http://192.168.0.13:8080/stocks/list",
                    {
                        headers: {
                            'Authorization': token()
                        }
                    }
                );
                const stockArray = Array.isArray(result.data) ? result.data : [];
                setStocks(stockArray);
            } catch (error) {
                console.error("Erreur lors de la récuperation du stock.", error)
            }
        }

        fetchStock();

    }, [])

  return (
    <div className='px-5 py-3'>
        <p className='text-xl text-neutral-700'>Liste de Stocks</p>
        <img className=' rounded-md' src={biby} alt="elevage image" />
        <div className="flex  mb-3">
            <AjoutStock/>
        </div>
        
        <Table>
            <TableCaption>Liste recente de Stock</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead className="text-center">Menu</TableHead>
                <TableHead>Quantité dispo</TableHead>
                <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    stocks.map((stock, index)=>(
                        <TableRow className="" key={index} >
                            <TableCell className="font-medium">S00{index+1}</TableCell>
                            <TableCell className="text-center">{stock.menu_id}</TableCell>
                            <TableCell> {stock.quantite_dispo} </TableCell>
                            <TableCell className=" flex gap-3 justify-center">
                                <ModifStock id={stock.stock_id} />
                                <DelStock id={stock.stock_id} />
                            </TableCell>
                        </TableRow>
                    ))
                }
                
            </TableBody>
        </Table>

    </div>
  )
}
