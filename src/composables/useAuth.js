import { useAuthStore } from "@/stores/user";
import { login, register, getLoggedInUser } from "@/api/modules/user";

export default function useAuth() {
    const authStore = useAuthStore();
    const loginUser = async (credentials) => {
        const res = await login(credentials);
        authStore.setToken(res.access_token);
    }
    const registerUser = async (credentials) => {
        const res = await register(credentials);
        authStore.setToken(res.access_token);
    }
    const getUser = async () => {
        const res = await getLoggedInUser();
        authStore.setUser(res);
    }
    return {
        loginUser,
        registerUser,
        getUser,
    }
}