import React from 'react';
import { Button } from '../../ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "../../ui/hover-card";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "../../ui/avatar";
  import { CalendarIcon } from "@radix-ui/react-icons";

  
  

const Notif = () => {
  return (
    <HoverCard>
            <HoverCardTrigger asChild>
                <Button size='sm' variant="outline" className='text-black' >
                    <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="20" height="20"
                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round" aria-hidden="true">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                <Avatar>
                    <AvatarImage src="https://github.com/vercel.png" />
                    <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@Resto</h4>
                    <p className="text-sm">
                    Plateforme pour nous aider de gérer de Restaurant.
                    </p>
                    <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                        Joined Mai 2024
                    </span>
                    </div>
                </div>
                </div>
            </HoverCardContent>
        </HoverCard>
  )
}

export default Notif
