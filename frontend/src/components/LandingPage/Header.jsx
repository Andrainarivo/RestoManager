import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
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
  } from "../ui/navigation-menu";


const Header = () => {


    return(
        <header className="bg-[#E2E4F1] w-full py-3 flex items-center flex-wrap justify-between ">
            <div className=" container mx-auto  flex items-center flex-wrap justify-between ">
                <div className="flex items-center">
                    <img src={logo} alt="logo" className=" w-12" />
                    <p className=" text-xl font-bold text-[#605DFF]">Restaurant Fianara</p>
                </div>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to='/home' legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Accueil
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>A propos</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-center rounded-md   no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <div className=" text-lg font-medium">
                                        Restaurant
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            C'est pour : <br />
                                            . gérer votre restaurant.<br />
                                            . sécuriser votre données.<br />
                                            . voir votre historique.
                                            
                                        </p>
                                    </a>
                                    </NavigationMenuLink>
                                </li>
                                <li className=" text-sm text-neutral-700 "  href="/docs" title="Introduction">
                                    Gestion de votre restaurant pour répondre votre besoins.
                                </li>
                                <li className=" text-sm text-neutral-700"  href="/docs/installation" title="Installation">
                                    Gestion de votre caisse pour chaque le mouvement.
                                </li>
                                <li className=" text-sm text-neutral-700"  href="/docs/primitives/typography" title="Typography">
                                    Sécurisation de votre données et les histogrammes des votre restaurant.
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
                                        className="flex h-full w-full select-none flex-col justify-center rounded-md  no-underline outline-none focus:shadow-md"
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
                                <li className=" text-sm font-medium" href="/docs" title="Introduction">
                                    +261 34 56 200 00
                                </li>
                                <li className=" text-sm font-medium" href="/docs/installation" title="Installation">
                                    +261 32 56 200 00
                                </li>
                                <li className=" text-sm font-medium" href="/docs/primitives/typography" title="Typography">
                                    +261 33 56 200 00
                                </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
                <div className=" flex gap-4">
                    <Link to="/login" > <button className=" border-solid border-2 rounded px-2 border-[#858baf] ">Sign in</button> </Link>
                    <Link to='/signup'><button className=" border-solid border-2 rounded px-2 border-[#605DFF] text-[#605DFF]">Sign up</button></Link>
                </div>
            </div>
        </header>
    )
}


export default Header;