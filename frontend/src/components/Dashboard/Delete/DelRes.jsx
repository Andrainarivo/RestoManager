import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../ui/alert-dialog";
import axios from 'axios';
import { token } from '../Header';

export default function DelRes({id}) {

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8080/clients/reservation/cancel/${id}`,
            {
                headers: {
                    "Authorization": token()
                }
            }
        )
        window.location.href = "/dashboard/reservation";
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger>
            <p className=" px-3 py-1 cursor-pointer rounded bg-red-500">Supprimer</p>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Supprimer</AlertDialogTitle>
            <AlertDialogDescription>
                Cette action vas supprimer la réservation. Voulez vous vraiment supprimer la réservation ?
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction  onClick={handleDelete} >Supprimer</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

  )
}
