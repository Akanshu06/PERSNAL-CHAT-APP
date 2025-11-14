import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${API_BASE_URL}/api/messages/${selectedConversation._id}`,{
					credentials: 'include'
				});
				const data = await res.json();
				
				if (data.error) throw new Error(data.error);
				
				setMessages(data); // Set messages from API response
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if(selectedConversation?._id) getMessages();
	}, [selectedConversation?._id,setMessages]); // Depend only on selectedConversation._id

	return { messages, loading };
};

export default useGetMessages;
