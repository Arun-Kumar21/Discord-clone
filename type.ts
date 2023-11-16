import { Server , Member , profile } from "@prisma/client"

export type ServerWithMembersWithProfiles = Server & {
    members : (Member & { profile : profile})[];
}