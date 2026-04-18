import React from 'react';
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
  import { Button } from '../../ui/button';
import axios from 'axios';
import { token } from '../../Dashboard/Header';

export default function DelMenu({id}) {

  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.0.13:8080/menus/del/${id}`,
        {
          headers: {
            'Authorization': token()
          }
        }
      );
      
      window.location.href = '/employe-dashboard/menu';

    } catch (error) {
      console.error("Erreur lors de le suppression du menu")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size='sm' variant="supp">Supprimer</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
          <AlertDialogHeader>
          <AlertDialogTitle>Supprimer</AlertDialogTitle>
          <AlertDialogDescription>
             Cette action vas supprimer le menu. Voulez vous vraiment supprimer la menu ?
          </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} >Supprimer</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
