import React from 'react'
import Conversation from './conversation'
import useGetConversations from '../../hooks/useGetConversation';
import {getRandomEmoji} from "../../utils/emojis.js"




const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	console.log("Conversations data:", conversations);
	
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{Array.isArray(conversations) && conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{!loading && (!conversations || conversations.length === 0) && (
				<div className="text-center text-gray-400 py-4">
					No conversations found
				</div>
			)}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;


//startr
// const conversations = () => {
	
// 	const { loading, conversations } = useGetConversations();
//   return (
// <div className='py-2 flex flex-col overflow-auto'>
//  			<Conversation />
//  			<Conversation />
//  			<Conversation />
//  			<Conversation />
//  			<Conversation />
//  			<Conversation />
//  		</div>
//   )
// }

// export default conversations