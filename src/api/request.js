import service from "./index";

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 例如，通常是Bearer Token
    }
    return config;
  },
  (error) => {
    console.error("请求发送失败：", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.status === 200) {
      return res;
    }
  },
  (error) => {
    const { response } = error;
    if (response) {
      console.error("请求发送失败：", response.data.detail || "Error");
    } else {
      console.error("网络连接异常，请稍后再试！");
    }
    return Promise.reject(error);
  }
);
export default service;
