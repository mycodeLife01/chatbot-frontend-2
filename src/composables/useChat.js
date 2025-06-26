import { getAllChats } from "@/api/modules/chat";

export default function useChat() {
    const loadHistoryChats = async () => {
        try {
            const res = await getAllChats();
            return res
        } catch (error) {
            console.error(error);
            return []
        }
    }
    return {
        loadHistoryChats
    }
}