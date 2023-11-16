import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { CurrentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(res: Request) {
  const { name, imageUrl } = await res.json();
  const profile = await CurrentProfile();

  if (!profile) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const server = await db.server.create({
      data: {
        name,
        profileId: profile.id,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileID: profile.id }],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },

    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
