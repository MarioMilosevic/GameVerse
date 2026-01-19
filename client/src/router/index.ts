import { createRouter, createWebHistory } from "vue-router";
import { getUserData } from "@/api/users";
import { tokenName } from "@/utils/constants";
import { showToast } from "@/utils/toast";
import useGetUserStore from "@/composables/useGetUserStore";
import useGetLoadingStore from "@/composables/useGetLoadingStore";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/details/:id",
    name: "GameDetails",
    component: () => import("@/views/game/index.vue"),
  },
  {
    path: "/my-reviews/:id",
    name: "My Reviews",
    component: () => import("@/views/reviews/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/login/index.vue"),
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: () => import("@/views/auth/sign-up/index.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/account/index.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/dashboard/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const { user, setUser } = useGetUserStore();
  const { setLoading } = useGetLoadingStore();
  const userToken = localStorage.getItem(tokenName);
  const isAuthRoute = to.name === "Login" || to.name === "Sign Up";

  if (userToken && isAuthRoute) return { name: "Home" };

  if (userToken && !user.value.id) {
    try {
      setLoading(true);
      const { data: userData } = await getUserData(userToken);
      if (userData.id) {
        setUser(userData);
      } else {
        showToast("Unable to fetch user data", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  if (user.value.role !== "ADMIN" && to.name === "Dashboard") {
    return { name: "Home" };
  }
});

export default router;
