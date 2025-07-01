import { ref } from "vue";
import { defineStore } from "pinia";
export const useMessageStore = defineStore("message", () => {
  const isMessageReloading = ref(false);
  const setIsMessageReloading = (value) => {
    isMessageReloading.value = value;
  };
  return {
    isMessageReloading,
    setIsMessageReloading,
  };
});
