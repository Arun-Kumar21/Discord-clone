import React from "react";
import { redirect } from "next/navigation";

import { UserButton } from "@clerk/nextjs";

import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import NavigationAction from "./navigation-action";


import { Separator } from "../ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";

const NavigationSidebar = async () => {
  const profile = await CurrentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem 
                name={server.name}
                id={server.id}
                imageUrl={server.imageUrl}
            />
          </div>
        ))}
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      </ScrollArea>
      
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
          <ModeToggle/>

          <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements : {
              avatarBox : "h-[32px] w-[32px]"
            }
          }}
          />
      </div>
    </div>
  );
};

export default NavigationSidebar;
