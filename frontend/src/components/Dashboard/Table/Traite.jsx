import React from 'react';
import { Button } from '../../ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '../../ui/table';
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card";
import AjoutAni from '../Modal/AjoutAni';




const Traite = () => {
  return (
    <div>
        <div className='  w-full md:-mt-10  mb-3 flex flex-col md:flex-row gap-2 md:gap-0 flex-wrap justify-between'>
            <div className=' flex items-end'>
                <AjoutAni/>
                <Button className=" bg-white  ml-3 mr-3" variant="ghost" size="sm" ><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> Filtrer</Button>
            </div>
            <Card className= ' w-32  bg-[#424662] text-white border-[#424662] ' >
              
                <CardContent className="flex flex-col items-start justify-center" >
                    <p className='text-sm'>Total</p>
                    <p className='text-xl font-medium' >13</p>
                </CardContent>
               
            </Card>
        </div>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">catégorie</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-center">Sexe</TableHead>
                <TableHead className="text-center">Age</TableHead>
                <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="" >
                    <TableCell className="font-medium">Mammifères</TableCell>
                    <TableCell className="text-center">Chèvre</TableCell>
                    <TableCell className="text-center">M</TableCell>
                    <TableCell className="text-center">3 ans</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Volaille</TableCell>
                    <TableCell className="text-center">Dindes</TableCell>
                    <TableCell className="text-center">F</TableCell>
                    <TableCell className="text-center">1 an</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Mammifères</TableCell>
                    <TableCell className="text-center">Mouton</TableCell>
                    <TableCell className="text-center">F</TableCell>
                    <TableCell className="text-center">6 mois</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Mammifères</TableCell>
                    <TableCell className="text-center">Chèvre</TableCell>
                    <TableCell className="text-center">M</TableCell>
                    <TableCell className="text-center">4 ans</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Volaille</TableCell>
                    <TableCell className="text-center">Canard</TableCell>
                    <TableCell className="text-center">F</TableCell>
                    <TableCell className="text-center">2 ans</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Mammifères</TableCell>
                    <TableCell className="text-center">Mouton</TableCell>
                    <TableCell className="text-center">M</TableCell>
                    <TableCell className="text-center">1.5 ans</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Volaille</TableCell>
                    <TableCell className="text-center">Poulet</TableCell>
                    <TableCell className="text-center">F</TableCell>
                    <TableCell className="text-center">9 mois</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Volaille</TableCell>
                    <TableCell className="text-center">Canard</TableCell>
                    <TableCell className="text-center">F</TableCell>
                    <TableCell className="text-center">8 mois</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Mammifères</TableCell>
                    <TableCell className="text-center">Boeuf</TableCell>
                    <TableCell className="text-center">M</TableCell>
                    <TableCell className="text-center">5 ans</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>
            </TableBody>
        </Table>
    </div>
  )
}

export default Traite
