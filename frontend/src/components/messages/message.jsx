import React from 'react'

const message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={"profilepic"} 
                alt="tailwind css and chat bubble" 
                />
            </div>
        </div>
        <div className={'chat-bubble text-white bg-blue-500'}>hello bro how are you.?</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:47</div>
    </div>
  )
}

export default message