import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("src/views/HomeView.vue"),
  },
  {
    path: "/details:id",
    name: "GameDetails",
    component: () => import("src/views/SingleGameView.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("src/views/LoginPage.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUpPage",
    component: () => import("src/views/SignUpPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// router.beforeEach(async (to) => {
//   // const userStore = useUserStore()
//   // const userToken = localStorage.getItem('gameVerse-token')

//   const isAuthRoute = to.name === "LoginPage" || to.name === "SignUpPage";

//   if (!isAuthRoute) return { name: "LoginPage" }
//   if (isAuthRoute) return { name: "Home" }
  

// })

export default router;
