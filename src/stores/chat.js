import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore("chat", () => {
  const isReloading = ref(false);
  const setIsReloading = (flag) => {
    isReloading.value = flag;
  };
  const selectedChatId = ref(null);
  const setSelectedChatId = (chatId) => {
    selectedChatId.value = chatId;
  };
  return {
    selectedChatId,
    setSelectedChatId,
    isReloading,
    setIsReloading,
  };
});
