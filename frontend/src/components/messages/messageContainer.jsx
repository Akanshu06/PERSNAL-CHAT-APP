//import React from 'react'
import Messages from './messages'

import MessageInput from './messageInput'

import { TiMessage } from 'react-icons/ti'

const messageContainer = () => {
  const noChatSelected = true;
  return (
    <div className='md:min-w-[450px] flex flex-col'>
 			{noChatSelected ? <NochatSelected /> : (
        <>
        {/* Header */}
        <div className='bg-slate-500 px-4 py-2 mb-2'>
          <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
        </div>

        <Messages />
        <MessageInput />
      </>
      )}
 		</div>
  )
}

export default messageContainer

const NochatSelected = () => {
  return (
    <div className='flex-1 flex items-center justify-center w-full h-full'>
 			{/* <p className='text-gray-500'>Select a chat to start messaging</p> */}
      <div className='px-4 text-center sm:text-x1 md:text-x1 text-gray-200 font-semibold flex flex-col
      items-center gap-2'>
        <p>Welcome 👋 Akanshu </p>
        <p>Select a chat to start messaging</p>
        <TiMessage className='text-9xl text-gray-200' />
      </div>
 		</div>
  )
}