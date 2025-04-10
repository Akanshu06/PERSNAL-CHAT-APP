import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	//setMessages: (messages) => set({ messages }),
	setMessages: (update) =>
		set((state) => ({
		  messages:
			typeof update === "function" ? update(state.messages) : update,
		})),
	  
}));

export default useConversation;