import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socketUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
			console.log("Connecting to socket at:", socketUrl);
			
			const socket = io(socketUrl, {
				query: {
					userId: authUser._id,
				},
				withCredentials: true,
				transports: ['websocket', 'polling'],
			});
			
			setSocket(socket);
			
			socket.on("connect", () => {
				console.log("✅ Socket connected:", socket.id);
			});
			
			socket.on("connect_error", (error) => {
				console.error("❌ Socket connection error:", error);
			});
			
			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};