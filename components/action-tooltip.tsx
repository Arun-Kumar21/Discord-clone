"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

interface ActionToolProps {
    label : string;
    children : React.ReactNode;
    side?: "left" | "top" | "right" | "bottom";
    align?: "start" | "center" | "end"; 
}

export const ActionTooltip = (
    {label,
    children,
    side,
    align} : ActionToolProps
) => {
    const [isClient , setIsClient] = useState(false);

    useEffect(()=>{
        setIsClient(true);
    },[])

    return(
        isClient &&
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>

                <TooltipContent>
                    <p className="font-semibold text-sm capitalize">
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}