import { createRouter, createWebHistory } from "vue-router";

/** 路由表 */
const routes = [
  {
    path: "/",
    component: () => import("@/layouts/ChatLayout.vue"), // 懒加载 Layout
    children: [
      {
        path: "", //  = '/'
        name: "NewChat",
        component: () => import("@/views/ChatView.vue"),
      },
      {
        path: "chat/:chatId?", // 可选 chatId -> /chat /chat/123
        name: "Chat",
        component: () => import("@/views/ChatView.vue"),
        props: true, // chatId 作为 prop 注入
      }
    ],
  },
];

/** 创建 Router 实例 */
const router = createRouter({
  history: createWebHistory(), // HTML5 History 模式 :contentReference[oaicite:0]{index=0}
  routes,
});

export default router;
