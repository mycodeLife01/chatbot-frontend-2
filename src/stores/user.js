import { defineStore } from "pinia";
import { ref } from "vue";
import { computed } from "vue";

export const useAuthStore = defineStore("user", () => {
    const isLoggedIn = ref(localStorage.getItem("isLoggedIn") || false);
    const user = ref(JSON.parse(localStorage.getItem("user")) || null);
    const token = ref(localStorage.getItem("chatbot-token") || "");

    const welcomeMessage = computed(() => {
        return `Welcome, ${user.value.username}!`;
    })

    const setUser = (userInfo) => {
        user.value = userInfo;
    }
    const setToken = (tokenStr) => {
        token.value = tokenStr;
    }
    const setIsLoggedIn = (isLoggedInFlag) => {
        isLoggedIn.value = isLoggedInFlag;
    }
    const logout = () => {
        isLoggedIn.value = false;
        user.value = null;
        token.value = "";
    }
    return {
        isLoggedIn,
        user,
        token,
        welcomeMessage,
        setUser,
        setToken,
        setIsLoggedIn,
        logout
    }
}, {
    persist: {
        key: "user",
        storage: localStorage,
        paths: ["isLoggedIn", "user", "token"]
    }
})  