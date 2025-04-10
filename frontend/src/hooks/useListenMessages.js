import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation(); // ✅ Removed `messages`, only need `setMessages`

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
			if (!newMessage._id) {
				newMessage._id = `temp-${Date.now()}`; // Generate a unique ID
			  }
			  
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            console.log("📩 New Message Received:", newMessage);

            // ✅ Use Functional State Update
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages]); // ✅ Removed `messages` from dependencies
};

export default useListenMessages;
