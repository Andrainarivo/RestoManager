import React from 'react';
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

const Right = () => {
  return (
    <div>
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
                    <Input id="name" value="@user x" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-start">
                    Password:
                    </Label>
                    <Input id="username" value="********    " className="col-span-3" />
                </div>
                </div>
                <SheetFooter>
                <SheetClose asChild>
                    <Button className='text-white' size='lg' variant='rafane' type="submit">Enregistrer</Button>
                </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default Right
