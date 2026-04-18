import React, { useEffect, useState } from 'react'
import setting from "../../../images/settings.svg";
import { Input } from '../../ui/input';
import { Label } from "../../ui/label";
import { Button } from '../../ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { token } from '../../Dashboard/Header';

export default function EmpRight() {

    const [personnel_key, setPassword] = useState('********');
    

    const handleUpdate = async () => {
        try {
            await axios.put('http://192.168.0.13:8080/employes/mypk/maj',
                 { personnel_key },
                 {
                    headers: {'Authorization': token()}
                 }
                )
        } catch (error) {
            console.error("Erreur lors de la modification de la mot de passe:", error)
        }
    }

    const [nom, setNom] = useState();

    useEffect(()=>{
        fetchEmploye();
    }, [])

    const fetchEmploye = async () => {
        try {
        const token = localStorage.getItem('token');
        if(token){
            const decoded = jwtDecode(token);
            const userId = decoded.id;
            const result = await axios.get(`http://192.168.0.13:8080/employes/get/${userId}`,
            {
                headers: {
                'Authorization': `${token}`
                }
            }
            );
            setNom(result.data[0].nom);
        }
        } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur:", error)
        }
    }

  return (
    <Sheet>
            <SheetTrigger asChild>
                <Button className='rounded-lg' size='sm' variant="outline"><img className=' cursor-pointer' src={setting} alt="" /></Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Modifier Profile</SheetTitle>
                <SheetDescription>
                    Changer votre profile ici. Cliquer sur enregistrer vous avez fini.
                </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-start">
                    Utilisateur:
                    </Label>
                    <Input id="name" value={`${nom}`} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-start">
                    Password:
                    </Label>
                    <Input id="username" value={personnel_key} onChange={ (e) => setPassword(e.target.value) }  className="col-span-3" />
                </div>
                </div>
                <SheetFooter>
                <SheetClose asChild>
                    <Button className='text-white' size='lg' variant='rafane' type="submit" onClick={handleUpdate}>Enregistrer</Button>
                </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
  )
}
