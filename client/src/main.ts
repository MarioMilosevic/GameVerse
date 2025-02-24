import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "src/router";
import "./style.css";
import App from "./App.vue";
import Vue3Toastify, { ToastContainerOptions } from "vue3-toastify";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
  .mount("#app");
