import ChatHeader from '@/components/chat/chat-header';
import { CurrentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { channel } from 'diagnostics_channel';
import { redirect } from 'next/navigation';
import React from 'react'

interface ChannelIdPageProps {
  params : {
    serverId : string;
    channelId : string;
    }
  }

const ChannelIdPage = async({params} : ChannelIdPageProps) => {

  const profile = await CurrentProfile();

  if(!profile) {
    return redirectToSignIn();
  }

  const { serverId, channelId } = params;

  const Channel = await db.channel.findUnique({
    where : {
      id : channelId
    },
  })

  const member = await db.member.findFirst({
    where : {
      serverId : serverId,
      profileId : profile.id
    }
  })

  if(!Channel || !member) {
    redirect("/");
  }



  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader 
        serverId={serverId}
        name={Channel.name}
        type='channel'
      />
    </div>
  )
}

export default ChannelIdPage;