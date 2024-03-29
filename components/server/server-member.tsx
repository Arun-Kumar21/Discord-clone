"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Server, profile } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { UserAvatar } from "../user-avatar";

interface ServerMemberProps {
  member: Member & { profile: profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 w-4 h-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 w-4 h-4 text-pink-500" />,
};

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${server.id}/conversations/${member.id}`);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md items-center flex gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvatar src={member.profile.imageUrl} className="h-8 w-8" />
      <p
        className={cn(
          "text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transiton",
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200  dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};

export default ServerMember;
