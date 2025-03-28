import { createRouter, createWebHistory } from "vue-router";
import { getUserData } from "src/api/users";
import { tokenName } from "src/utils/constants";
import { showToast } from "src/utils/toast";
import useGetUserStore from "src/composables/useGetUserStore";
import useGetLoadingStore from "src/composables/useGetLoadingStore";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("src/views/HomeView.vue"),
  },
  {
    path: "/details/:id",
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

router.beforeEach(async (to) => {
  const { user, setUser } = useGetUserStore();
  const { setLoading} = useGetLoadingStore()
  const userToken = localStorage.getItem(tokenName);
  const isAuthRoute = to.name === "Login" || to.name === "Sign Up";

  if (!userToken && !isAuthRoute) return { name: "Login" };

  if (userToken && isAuthRoute) return { name: "Home" };

  if (userToken && !user.value.id) {
    try {
      setLoading(true)
      const { data:userData } = await getUserData(userToken);
      if (userData.id) {
        setUser(userData)
      } else {
        showToast('Unable to fetch user data', 'error')
      }
    } catch (error) {
      console.error(error)      
    } finally {
      setLoading(false)
    }
  }
  // if (user.value.role !== 'ADMIN' && to.name !== "Home") {
  //   return {name:"Home"}
  // }
});

export default router;
