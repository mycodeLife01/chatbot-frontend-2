import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore("chat", () => {
    const selectedChatId = ref(null);
    const setSelectedChatId = (chatId) => {
        selectedChatId.value = chatId;
    }
    return {
        selectedChatId,
        setSelectedChatId,
    }
})