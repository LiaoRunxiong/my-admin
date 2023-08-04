import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index";
import { setupRouterGuards } from "./guards";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    hidden: true,
    meta: { title: "首页", affix: true, icon: "dashboard" },
    children: [
      {
        name: "dashboard",
        path: "/dashboard",
        component: () => import("@/views/Hello/index.vue"),
        meta: { title: "首页", affix: true, icon: "dashboard" },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/sys/login/Login.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // 是否应该禁止尾部斜杠。默认为假
  // strict: true,
  silent: true,
});
setupRouterGuards(router);
export function setupRouter(app) {
  app.use(router);
}
