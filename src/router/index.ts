import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import { useAuthStore } from "@/stores/auth";
import BoardIndex from "@/views/boards/BoardIndex.vue";
import BoardView from "@/views/boards/BoardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "boardIndex" },
    },
    {
      path: "/",
      name: "baseLayout",
      component: BaseLayout,
      children: [
        {
          path: "/boards",
          name: "boardIndex",
          component: BoardIndex,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/boards/:boardId",
          name: "boardView",
          component: BoardView,
          meta: {
            requiresAuth: true,
          },
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
          meta: {
            requiresGuest: true,
          },
        },
        {
          path: "/register",
          name: "register",
          component: RegisterView,
          meta: {
            requiresGuest: true,
          },
        },
      ],
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/errors/404.vue"),
      meta: {
        requiresRedirect: true,
      },
    },
    {
      path: "/500",
      name: "500",
      component: () => import("@/views/errors/500.vue"),
      meta: {
        requiresRedirect: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/errors/404.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuthStore();

  //avoid error pages being visited via url
  if (to.matched.some((record) => record.meta.requiresRedirect) && !from.name) {
    next({ name: "home" });
  }

  //redirect user depending on authentication
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: "login" });
  } else if (
    to.matched.some((record) => record.meta.requiresGuest) &&
    isLoggedIn
  ) {
    next({ name: "boardIndex" });
  } else {
    next();
  }
});

export default router;
