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
import AjoutMenu from '../Ajout/AjoutMenu';
import ModifMenu from '../Modif/ModifMenu';
import DelMenu from '../Delete/DelMenu';
import { token } from '../../Dashboard/Header';

export default function Menu() {

    const [menus, setMenus] = useState([]);

    useEffect(()=>{
        
        const fetchMenu = async () => {
            try {
                const result = await axios.get("http://192.168.0.13:8080/menus/list",
                    {
                        headers: {
                            'Authorization': token()
                        }
                    }
                );
                const menuArray = Array.isArray(result.data) ? result.data : [] ;
                setMenus(menuArray);
            } catch (error) {
                console.error("Erreur lors de la récuperation de menus.", error)
            }
        }

        fetchMenu();

    }, [])

  return (
    <div className='px-5 py-3'>
        <p className='text-xl text-neutral-700'>Liste de Menus</p>
        <img className=' rounded-md' src={biby} alt="elevage image" />
        <div className="flex  mb-3">
            <AjoutMenu/>
        </div>
        
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">catégorie</TableHead>
                    <TableHead className="text-center">Plat</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    menus.map((menu, index)=>(
                        <TableRow className="" key={index} >
                            <TableCell className="font-medium">{menu.categorie}</TableCell>
                            <TableCell className="text-center">{menu.nom}</TableCell>
                            <TableCell>{menu.prix}ar</TableCell>
                            <TableCell className="">{menu.description}</TableCell>
                            <TableCell className=" flex gap-3 justify-center">
                                <ModifMenu id={menu.menu_id} />
                                <DelMenu id={menu.menu_id} />
                            </TableCell>
                        </TableRow>
                    ))
                }
                
            </TableBody>
        </Table>

    </div>
  )
}
