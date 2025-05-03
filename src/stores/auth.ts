import axiosInstance from "@/lib/axios";
import router from "@/router";

import type {
  CustomError,
  LoginForm,
  Processing,
  RegisterForm,
  User,
} from "@/types";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useToast } from "vue-toast-notification";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<User | null>(null);
    const isLoggedIn = ref<boolean>(false);
    const processing = reactive<Processing>({
      login: false,
      register: false,
    });
    const $toast = useToast();

    const register = async (
      payload: RegisterForm,
      error: CustomError,
      controller: AbortController
    ) => {
      if (processing.register) return;
      processing.register = true;

      await axiosInstance.get("/sanctum/csrf-cookie", {
        baseURL: "http://localhost:8000",
        signal: controller.signal,
      });

      try {
        await axiosInstance.post("/register", payload, {
          signal: controller.signal,
        });
        await getUser(controller);
        router.push({ name: "authTest" });
        $toast.info("You're logged in!", {
          position: "top-right",
        });
      } catch (err) {
        Object.assign(error, err);
      } finally {
        processing.register = false;
      }
    };

    const login = async (
      payload: LoginForm,
      error: CustomError,
      controller: AbortController
    ) => {
      if (processing.login) return;
      processing.login = true;

      await axiosInstance.get("/sanctum/csrf-cookie", {
        baseURL: "http://localhost:8000",
        signal: controller.signal,
      });

      try {
        await axiosInstance.post("/login", payload, {
          signal: controller.signal,
        });
        await getUser(controller);
        router.push({ name: "authTest" });
        $toast.info("You're logged in!", {
          position: "top-right",
        });
      } catch (err) {
        Object.assign(error, err);
      } finally {
        processing.login = false;
      }
    };

    const getUser = async (controller: AbortController) => {
      if (isLoggedIn.value) {
        return;
      }

      try {
        const response = await axiosInstance.get("/user", {
          signal: controller.signal,
        });
        user.value = response.data;
        isLoggedIn.value = true;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const logout = async () => {
      try {
        await axiosInstance.post("/logout");
        clearState();
        router.push({ name: "home" });
        $toast.info("You're logged out!", {
          position: "top-right",
        });
      } catch (error) {
        console.error(error);
      }
    };

    const clearState = () => {
      user.value = null;
      isLoggedIn.value = false;
    };

    return {
      user,
      isLoggedIn,
      processing,
      register,
      login,
      getUser,
      logout,
      clearState,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["user", "isLoggedIn"],
    },
  }
);
