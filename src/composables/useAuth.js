import { useAuthStore } from "@/stores/user";
import { useThemeStore } from "@/stores/theme";
import { login, register, getLoggedInUser } from "@/api/modules/user";
import router from "@/router";
export default function useAuth() {
  const authStore = useAuthStore();
  const themeStore = useThemeStore();
  const loginUser = async (credentials) => {
    try {
      const res = await login(credentials);
      if (res.code === 2002) {
        authStore.setErrorMsg("用户不存在");
        return false;
      } else if (res.code === 2003) {
        authStore.setErrorMsg("密码错误");
        return false;
      }
      authStore.setToken(res.access_token);
      authStore.setIsLoggedIn(true);
      getUser();
      themeStore.setIsSidebarOpen(true);
      return true;
    } catch (error) {
      authStore.setErrorMsg("登录失败，请稍后再试");
      return false;
    }
  };
  const registerUser = async (credentials) => {
    try {
      const res = await register(credentials);
      if (res.code === 2001) {
        authStore.setErrorMsg("用户已存在");
        return false;
      }
      authStore.setToken(res.access_token);
      authStore.setIsLoggedIn(true);
      themeStore.setIsSidebarOpen(true);
      return true;
    } catch (error) {
      authStore.setErrorMsg("注册失败，请稍后再试");
      return false;
    }
  };
  const getUser = async () => {
    try {
      const res = await getLoggedInUser();
      authStore.setUser(res);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const logout = async () => {
    authStore.setToken(null);
    authStore.setIsLoggedIn(false);
    authStore.setUser(null);
    themeStore.setIsSidebarOpen(false);
    router.push("/");
  };
  return {
    loginUser,
    registerUser,
    getUser,
    logout,
  };
}
