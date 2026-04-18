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
import AjoutPro from '../Modal/AjoutRes';
import AjoutRes from '../Modal/AjoutRes';


const Stock = () => {
  return (
    <div>
        <div className='  w-full md:-mt-10  mb-3 flex flex-wrap gap-20'>
            <div className=' flex items-end'>
                <AjoutRes/>
                <Button className=" bg-white  ml-3 mr-3" variant="ghost" size="sm" ><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> Filtrer</Button>
            </div>
            <div className=" flex flex-wrap gap-5">
                <Card className= '  bg-[#424662] text-white border-[#424662] ' >
                   <CardHeader>
                        <CardTitle>Animaux en vente: 100</CardTitle>
                        <CardDescription className='flex gap-1' >
                                <p className='text-sm text-red-400 font-medium' >Boeuf: 10</p>
                                <p className='text-sm text-yellow-400 font-medium' >Mouton: 20</p>
                                <p className='text-sm text-green-400 font-medium' >Chèvre: 30</p>
                        </CardDescription>
                    </CardHeader>
                 
                </Card>
                <Card className= '  bg-[#424662] text-white border-[#424662] ' >
                   <CardHeader>
                        <CardTitle className="" >Quantité d'oeufs:</CardTitle>
                        <CardDescription className=' text-blue-300  font-medium' >100 pièces</CardDescription>
                    </CardHeader>
                </Card>
                <Card className= '  bg-[#424662] text-white border-[#424662] ' >
                   <CardHeader>
                        <CardTitle className="" >Quantité de lait:</CardTitle>
                        <CardDescription className=' text-white font-medium' >70 Litres</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            
        </div>

        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Nom</TableHead>
                <TableHead className="text-center">Source</TableHead>
                <TableHead className="text-center">Quatité</TableHead>
                <TableHead className="text-center">Prix</TableHead>
                <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="" >
                    <TableCell className="font-medium">Oeuf</TableCell>
                    <TableCell className="text-center">Volaille</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">21 000ar</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Lait</TableCell>
                    <TableCell className="text-center">Mamifère</TableCell>
                    <TableCell className="text-center">5l</TableCell>
                    <TableCell className="text-center">15 000ar</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Lait</TableCell>
                    <TableCell className="text-center">Mamifère</TableCell>
                    <TableCell className="text-center">10l</TableCell>
                    <TableCell className="text-center">30 000ar</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Oeuf</TableCell>
                    <TableCell className="text-center">Volaille</TableCell>
                    <TableCell className="text-center">100</TableCell>
                    <TableCell className="text-center">70 000ar</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Lait</TableCell>
                    <TableCell className="text-center">Mamifère</TableCell>
                    <TableCell className="text-center">200l</TableCell>
                    <TableCell className="text-center">120 000ar</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Lait</TableCell>
                    <TableCell className="text-center">Mamifère</TableCell>
                    <TableCell className="text-center">6l</TableCell>
                    <TableCell className="text-center">18 000ar</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Oeuf</TableCell>
                    <TableCell className="text-center">Volaille</TableCell>
                    <TableCell className="text-center">20</TableCell>
                    <TableCell className="text-center">14 000ar</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Lait</TableCell>
                    <TableCell className="text-center">Mamifère</TableCell>
                    <TableCell className="text-center">50l</TableCell>
                    <TableCell className="text-center">150 000ar</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell className="font-medium">Lait</TableCell>
                    <TableCell className="text-center">Mamifère</TableCell>
                    <TableCell className="text-center">20l</TableCell>
                    <TableCell className="text-center">500 000ar</TableCell>
                    <TableCell className="text-end">Modifier</TableCell>

                </TableRow>
            </TableBody>
        </Table>
    </div>
  )
}

export default Stock
