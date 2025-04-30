import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import AboutView from "@/views/AboutView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "baseLayout",
      component: BaseLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/about",
          name: "about",
          component: AboutView,
        },
      ],
    },
    {
      path: "/",
      name: "authLayout",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: LoginView,
        },
        {
          path: "/register",
          name: "register",
          component: RegisterView,
        },
      ],
    },
  ],
});

export default router;
