"use client"
import React from 'react';
import logo from "./images/logo.png";
import { Button } from './components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "./components/ui/table";
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
  } from "./components/ui/alert-dialog"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./components/ui/card";
import { Input } from './components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./components/ui/dialog"
import { Label } from "./components/ui/label";


 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
  } from "./components/ui/navigation-menu";
import { Link } from 'react-router-dom';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "./components/ui/pagination";

import { Progress } from "./components/ui/progress";
import { useEffect, useState } from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "./components/ui/select";

  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "./components/ui/sheet";

  import { Skeleton } from "./components/ui/skeleton";

  import { Calendar } from "./components/ui/calendar";

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "./components/ui/popover";

import { CalendarIcon } from "@radix-ui/react-icons";
 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./components/ui/avatar";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./components/ui/hover-card";

 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }
  
  
  
  

function Comps() {

    // const [date, setDate] = React.utate<Date | undefined>(new Date())


    const [progress, setProgress] = useState(13)
 
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className=" w-2/4 px-6 py-4 left-0 top-0 translate-x-[50%] flex flex-col gap-10 justify-center items-center bg-blue-200">

        <h1 className=' text-2xl font-semibold'>My components</h1>
        
        <h2 className=' text-red-600 font-medium'>Tableau</h2>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <h2 className=' text-red-600 font-medium'>Alert</h2>
        <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can add components and dependencies to your app using the cli.
            </AlertDescription>
        </Alert>

        <h2 className=' text-red-600 font-medium'>Navigation menu</h2>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Accueil
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>A propos</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                            <NavigationMenuLink asChild>
                            <a
                                className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted  no-underline outline-none focus:shadow-md"
                                href="/"
                            >
                                <div className=" text-lg font-medium">
                                Farm
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                    C'est pour : <br />
                                    . gérer votre ferme.<br />
                                    . sécuriser votre données.<br />
                                    . voir votre historique.
                                    
                                </p>
                            </a>
                            </NavigationMenuLink>
                        </li>
                        <li href="/docs" title="Introduction">
                            Gestion de votre ferme pour répondre votre besoins.
                        </li>
                        <li href="/docs/installation" title="Installation">
                            Gestion de votre caisse pour chaque le mouvement.
                        </li>
                        <li href="/docs/primitives/typography" title="Typography">
                            Sécurisation de votre données et les histogrammes des votre ferme.
                        </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                            <NavigationMenuLink asChild>
                            <a
                                className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted  no-underline outline-none focus:shadow-md"
                                href="/"
                            >   
                                <img src={logo} alt="logo" className=" w-12" />
                                <div className=" text-lg font-medium">
                                Notre contact:
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                    www.facebook.com<br />
                                    www.instagram.com<br />
                                    www.telegram.com
                                    
                                </p>
                            </a>
                            </NavigationMenuLink>
                        </li>
                        <li href="/docs" title="Introduction">
                            +261 34 56 200 00
                        </li>
                        <li href="/docs/installation" title="Installation">
                            +261 32 56 200 00
                        </li>
                        <li href="/docs/primitives/typography" title="Typography">
                            +261 33 56 200 00
                        </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>

        <h2 className=' text-red-600 font-medium'>Alert dialog</h2>
        <AlertDialog>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <h2 className=' text-red-600 font-medium'>Card</h2>
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

        <h2 className=' text-red-600 font-medium'>Input</h2>
        <Input className='border-blue-500' type="text" placeholder='Rakoto' />

        <h2 className=' text-red-600 font-medium'>Dialog</h2>
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="name" >
                        Name
                        </Label>
                        <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="username" >
                        Username
                        </Label>
                        <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>
                </div>
                <DialogFooter>
                <Button className=' text-white ' size='sm' variant='rafane' type="submit">Submit</Button>
                <Button   size='sm' variant='destructive' type="submit">Annuler</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        
        <h2 className=' text-red-600 font-medium'>Pagination</h2>
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationLink href="#" isActive>
                    2
                </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

        <h2 className=' text-red-600 font-medium'>Select</h2>
        <Select  >
            <SelectTrigger className="w-[180px] b">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <h2 className=' text-red-600 font-medium'>Sheet</h2>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                    Make changes to your profile here. Click save when you're done.
                </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                    Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
                </div>
                <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>

        {/* <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
        /> */}


        <h2 className=' text-red-600 font-medium'>Popover</h2>
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                    </p>
                </div>
                <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                        id="width"
                        defaultValue="100%"
                        className="col-span-2 h-8"
                    />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Max. width</Label>
                    <Input
                        id="maxWidth"
                        defaultValue="300px"
                        className="col-span-2 h-8"
                    />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                        id="height"
                        defaultValue="25px"
                        className="col-span-2 h-8"
                    />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Max. height</Label>
                    <Input
                        id="maxHeight"
                        defaultValue="none"
                        className="col-span-2 h-8"
                    />
                    </div>
                </div>
                </div>
            </PopoverContent>
        </Popover>

        <h2 className=' text-red-600 font-medium'>Hover card</h2>
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">@nextjs</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                <Avatar>
                    <AvatarImage src="https://github.com/vercel.png" />
                    <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@nextjs</h4>
                    <p className="text-sm">
                    The React Framework – created and maintained by @vercel.
                    </p>
                    <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                        Joined December 2021
                    </span>
                    </div>
                </div>
                </div>
            </HoverCardContent>
        </HoverCard>

        <h2 className=' text-red-600 font-medium'>Skeleton</h2>
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full bg-blue-400" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-blue-400 " />
                <Skeleton className="h-4 w-[200px] bg-blue-400 " />
            </div>
        </div>

        <h2 className=' text-red-600 font-medium'>Progress bar</h2>
        <Progress value={progress} className="w-[30%] bg-blue-400" />
        


        <Button variant='rafane'>Code with sahine</Button>
        

    </div>
  );
}

export default Comps;


