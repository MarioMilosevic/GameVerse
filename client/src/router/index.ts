import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("src/views/HomeView.vue"),
  },
  {
    path: '/details:id',
    name: "GameDetails",
    component:() => import("src/views/SingleGameView.vue")
  },
  {
    path: "/login",
    name: "LoginPage",
    component:() => import('src/views/LoginPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
