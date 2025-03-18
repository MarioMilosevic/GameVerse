import { createRouter, createWebHistory } from "vue-router";
import { getUserData } from "src/api/users";
import useGetUserStore from "src/composables/useGetUserStore";
import { tokenName } from "src/utils/constants";

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

router.beforeEach(async (to) => {
  const { user, setUser } = useGetUserStore();
  const userToken = localStorage.getItem(tokenName);

  console.log("ovo bi trebao biti token", userToken);

  const isAuthRoute = to.name === "Login" || to.name === "Sign Up";
  // console.log()

  if (!userToken && !isAuthRoute) return { name: "Login" };
  // console.log("ide li dalje");
  if (userToken && isAuthRoute) return { name: "Home" };
  if(userToken){
    const data = await getUserData(userToken)
    console.log("ovo bi trebale biti informacije usera",data)
  }
  // if (userToken) {
  //   const data = await getUserData(userToken as string);
  //   console.log(data);
    // setUser(user)
    // if (user?.role !== 'ADMIN' && to.name !== "Home") {
    // return {name:'Home'}
    // }
  // }
});

export default router;
