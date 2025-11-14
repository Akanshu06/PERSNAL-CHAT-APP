import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		
		setLoading(true);
		console.log("Attempting login to:", `${API_BASE_URL}/api/auth/login`);
		
		try {
			const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
				credentials: 'include'
			});

			console.log("Login response status:", res.status);
			
			if (!res.ok) {
				const errorText = await res.text();
				console.error("Login failed:", errorText);
				throw new Error(`Login failed: ${res.status} ${res.statusText}`);
			}

			const data = await res.json();
			console.log("Login successful:", data);

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			console.error("Login error:", error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}