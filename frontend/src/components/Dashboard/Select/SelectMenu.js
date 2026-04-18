import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../../ui/select";
import axios from 'axios';

export default function SelectMenu() {

    const [nom, setMenu] = useState([]);

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
    <Select onValueChange={(value)=>setMenu(value)} >
        <SelectTrigger className="w-[250px] b">
            <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectLabel>Select menus</SelectLabel>

                {
                nom.map((menu, index)=>{
                    return  <SelectItem value={menu.menu_id.toString()} key={index} >{menu.nom}</SelectItem>
                        
                })
                }
            
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}
