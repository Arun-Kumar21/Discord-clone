import { v4 as uuidv4 } from 'uuid';

import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : {params : {
        serverId : string
    }}
) {
    try {
        const profile = await CurrentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized" , { status : 401});
        }

        if(!params) {
            return new NextResponse("Server Id missing" , { status : 400 });
        }

        const server = await db.server.update({
            where:{
                id: params.serverId ,
                profileId : profile.id
            },
            data : {
                inviteCode : uuidv4()
            }
        })

        return NextResponse.json(server);
        
    } catch (error) {
        console.log("[Server_ID]" , error);
        return new NextResponse("Internal server Error"  , {status : 500})
    }
    
}