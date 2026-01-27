import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  BiStarHalf,
  BiStarFill,
  BiStar,
  GiExitDoor,
  MdDarkmode,
  MdLightmode,
  MdRatereview,
  MdAccountbox,
  MdClose,
  MdDashboardcustomize,
  FaRegularTrashAlt,
  FaEdit,
  IoCloseSharp,
  FcCheckmark,
  CoHamburgerMenu,
  CoCalendar,
  CoClock,
  CoStar,
  CoDollar,
  CoArrowCircleLeft,
  CoArrowCircleRight,
  RiCloseCircleFill,
} from "oh-vue-icons/icons";

addIcons(
  BiStarHalf,
  BiStarFill,
  BiStar,
  GiExitDoor,
  MdDarkmode,
  MdLightmode,
  MdRatereview,
  MdAccountbox,
  MdDashboardcustomize,
  MdClose,
  FaRegularTrashAlt,
  FaEdit,
  IoCloseSharp,
  FcCheckmark,
  CoHamburgerMenu,
  CoCalendar,
  CoClock,
  CoStar,
  CoDollar,
  CoArrowCircleLeft,
  CoArrowCircleRight,
  RiCloseCircleFill,
);

import "./style.css";
import App from "./App.vue";
import Vue3Toastify, { ToastContainerOptions } from "vue3-toastify";

const app = createApp(App);

app
  .component("v-icon", OhVueIcon)
  .use(router)
  .use(createPinia())
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
  .mount("#app");
