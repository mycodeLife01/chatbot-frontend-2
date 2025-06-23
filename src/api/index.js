// api/index.js
import axios from 'axios';

// 根据运行环境配置不同的baseURL
const baseURL = "http://127.0.0.1:8000/"

const service = axios.create({
  baseURL: baseURL,
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

export default service;