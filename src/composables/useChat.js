import { getAllChats } from "@/api/modules/chat";

export default function useChat() {
    const loadHistoryChats = async () => {
        const res = await getAllChats();
        return res.data
    }
    return {
        loadHistoryChats
    }
}