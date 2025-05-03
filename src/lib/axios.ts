import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import type { CustomError } from "@/types";
import axios from "axios";
import { useToast } from "vue-toast-notification";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  withXSRFToken: true,
  timeout: 30000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const auth = useAuthStore();

    const $toast = useToast();

    const error: CustomError = {
      status: err.response?.status,
      original: err,
      validation: {},
      message: null,
    };

    if (err.code == "ERR_NETWORK") {
      $toast.error("No internet connection!");
    }

    if (err.code == "ECONNABORTED" && !err.response) {
      $toast.error("Request timeout!");
    }

    switch (err.response.status) {
      case 401:
        auth.clearState();
        (async () => {
          await router.push({ name: "login" });
          $toast.error("Unauthorized");
        })();
        break;
      case 404:
        router.push({ name: "404" });
        break;
      case 419:
        auth.clearState();
        (async () => {
          await router.push({ name: "login" });
          $toast.error("Unauthorized");
        })();
        break;
      case 422:
        for (let field in err.response.data.errors) {
          error.validation[field] = err.response.data.errors[field][0];
        }
        break;
      default:
        (async () => {
          await router.push({ name: "500" });
          $toast.error("Something went wrong!");
        })();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
