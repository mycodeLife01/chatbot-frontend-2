import { defineStore } from "pinia";
import { ref } from "vue";
import { computed } from "vue";

export const useAuthStore = defineStore("user", () => {
    const isLoggedIn = ref(JSON.parse(localStorage.getItem("isLoggedIn")) || false);
    const user = ref(JSON.parse(localStorage.getItem("user")) || null);
    const token = ref(localStorage.getItem("token") || "");

    const errorMsg = ref('')
    const welcomeMessage = computed(() => {
        return user.value ? `你好, ${user.value.username}。` : '请登录以使用';
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
    const setErrorMsg = (msg) => {
        errorMsg.value = msg;
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
        logout,
        errorMsg,
        setErrorMsg
    }
}, {
    persist: {
        key: "user",
        storage: localStorage,
        paths: ["isLoggedIn", "user", "token"]
    }
})  