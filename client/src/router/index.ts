import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "src/stores/userStore";

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
    name: "Login",
    component: () => import("src/views/LoginView.vue"),
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: () => import("src/views/SignUpView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (to) => {
//   const userStore = useUserStore()
//   const userToken = localStorage.getItem('gameVerse-token')
//   console.log("ovo bi trebao biti token",userToken)

//   const isAuthRoute = to.name === "Login" || to.name === "Sign Up";

//   if (!userToken || !isAuthRoute) return { name: "Login" }
//   if (userToken && isAuthRoute) return { name: "Home" }
//   if (userToken) {
//     const data = await getUserData(userToken)
//   }

// })

export default router;
