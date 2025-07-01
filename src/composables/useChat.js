import { getAllChats, addNewChat, updateChat, removeChat } from "@/api/modules/chat";

export default function useChat() {
  const loadHistoryChats = async () => {
    try {
      const res = await getAllChats();
      return res;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const newChat = async (data) => {
    try {
      const res = await addNewChat(data);
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const updateChatName = async (data) => {
    try {
      const res = await updateChat(data);
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const deleteChat = async (param) => {
    try {
      const res = await removeChat(param);
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return {
    loadHistoryChats,
    newChat,
    updateChatName,
    deleteChat,
  };
}
