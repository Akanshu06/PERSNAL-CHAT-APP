import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	//console.log("Messages Array:", messages);
// messages.forEach(msg => console.log("Message ID:", msg._id));
 	useListenMessages();
	const lastMessageRef = useRef();

	// ✅ FIX: Auto-scroll when messages update
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
		}, 100);
	}, [messages]);
		console.log(messages);
	

	return (
		<div className="px-4 flex-1 overflow-auto">
		  {!loading &&
			messages.length > 0 &&
			messages.map((message, index) => {
				const isLastMessage = index === messages.length - 1;
				return (
					<div key={message._id || `temp-${index}`} ref={isLastMessage ? lastMessageRef : null}>
						<Message message={message} />
					</div>
  );
	})}

		  {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

		  {!loading && messages.length === 0 && (
			<p className="text-center text-red-600">Send a message to start the conversation</p>
		  )}
		</div>
	);
};
export default Messages;
