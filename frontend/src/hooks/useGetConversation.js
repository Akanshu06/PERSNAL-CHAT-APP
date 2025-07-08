
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const API_BASE_URL = import.meta.env.VITE_API_URL;
const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	//console.log(conversations);
	
	
	

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${API_BASE_URL}/api/users`,{
					credentials: 'include'
				});
				const data = await res.json();
				
				console.log("API Response:", data);
				
				if (data.error) {
					throw new Error(data.error);
				}
				
				// Ensure data is an array
				if (Array.isArray(data)) {
					setConversations(data);
				} else {
					console.error("Expected array but got:", typeof data, data);
					setConversations([]);
				}
			} catch (error) {
				console.error("Error fetching conversations:", error);
				toast.error(error.message);
				setConversations([]); // Set empty array on error
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;
