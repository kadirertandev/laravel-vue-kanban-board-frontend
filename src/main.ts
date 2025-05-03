import "./assets/main.css";
import "vue-toast-notification/dist/theme-bootstrap.css";

import App from "./App.vue";
import router from "./router";

import { createApp } from "vue";
const app = createApp(App);

import { createPinia } from "pinia";
const pinia = createPinia();

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
pinia.use(piniaPluginPersistedstate);

import ToastPlugin from "vue-toast-notification";
app.use(ToastPlugin);

app.use(router);
app.use(pinia);

app.mount("#app");
