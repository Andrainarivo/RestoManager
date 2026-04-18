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
import axios from 'axios';





const Accueil = () => {

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchData = async () => {


            try {
                const result = await axios.get("http://localhost:8080/menus/list");
                // console.log(result.data)
                setMenu(result.data);
            } catch (error) {
            console.error('Erreur lors de la récupération des menu:', error);
                
            }
        }

        fetchData();
    }, [])

   

  return (
    <div className='px-5 py-3'>
        <p className='text-xl text-neutral-700'>Liste de menus</p>
        <img className=' rounded-md' src={biby} alt="elevage image" />
 
        
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">catégorie</TableHead>
                    <TableHead className="text-center">Plat</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {
                    menu.map((menu, index)=>(
                        
                        <TableRow className="" key={index} >
                            <TableCell className="font-medium">{menu.categorie}</TableCell>
                            <TableCell className="text-center">{menu.nom}</TableCell>
                            <TableCell>{menu.prix} ar</TableCell>
                            <TableCell>{menu.description}</TableCell>
                           
                        </TableRow>
                    ))
                    
                }
                

                
            </TableBody>
        </Table>

    </div>
  )
}

export default Accueil





















