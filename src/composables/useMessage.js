import { getAllMessages, addMessage } from "@/api/modules/message";
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
  const sendMessage = async (message) => {
    try {
      const formData = new FormData();
      formData.append('chat_id', message.chat_id);
      formData.append('message_content', message.message_content);
      if (message.files) {
        message.files.forEach(file => {
          formData.append('files', file);
        });
      }
      const res = await addMessage(formData);
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return {
    getMessages,
    sendMessage,
  };
}
