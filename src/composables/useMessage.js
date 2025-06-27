import { getAllMessages } from "@/api/modules/message";
export default function useMessage() {
  const getMessages = async (chatId) => {
    try {
      const res = await getAllMessages({ chat_id: chatId });
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const addMessage = async (message) => {
    try {
      const res = await addMessage(message);
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return {
    getMessages,
    addMessage,
  };
}
