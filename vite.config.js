import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  server: {
    host: true, // 等价于 "0.0.0.0"
    port: 5173, // 可自定，默认 5173
    strictPort: true, // 端口被占用就报错，不自动换
    open: false, // 启动时不自动打开浏览器
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
