"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    return(
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