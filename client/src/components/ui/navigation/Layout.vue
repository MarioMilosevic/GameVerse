<template>
  <LoadingSpinner v-if="loading" />
  <nav
    :class="[
      `flex justify-between items-center sm:px-8 sm:py-4 top-0 px-2 py-2 ${
        isSticky ? 'fixed z-10' : 'absolute'
      } top-0 right-0 w-full bg-slate-300 dark:bg-slate-900 transition-all duration-700`,
    ]"
    v-else
  >
    <RouterLink :to="{ name: 'Home' }" class="flex items-center gap-4">
      <img src="/controller.png" class="max-h-[20px] sm:max-h-[35px]" />
      <h1 class="sm:text-2xl text-lg">GameVerse</h1>
    </RouterLink>

    <div
      v-if="user.id"
      class="flex items-center justify-between sm:min-w-[130px] rounded-xl relative group sm:gap-2 gap-4"
      @click="toggleMenu"
      @blur="closeNavigationMenu"
      tabindex="0"
    >
      <!-- <ThemeIcon :theme="theme" @dark-mode-event="handleTheme" /> -->
      <!-- <img
        :src="renderUserImage(user.image)"
        :alt="user.image"
        class="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] rounded-xl object-cover"
      /> -->
      <NavigationMenu
        :class="[
          '',
          navigationMenuOpen
            ? 'scale-y-100 opacity-100'
            : 'scale-y-100 opacity-100',
          'group-hover:opacity-100 group-hover:scale-y-100',
        ]"
        :theme="theme"
        @dashboard-event="dashboardHandler"
        @sign-out-event="signOutHandler"
        @toggle-theme-event="handleTheme"
        @my-reviews-event="myReviewsHandler"
        @account-event="accountHandler"
      />
      <!-- <NavigationMenu
        :class="[
          'absolute -bottom-4 left-0 translate-y-full origin-top transition-all duration-500 ease-out',
          navigationMenuOpen
            ? 'scale-y-100 opacity-100'
            : 'scale-y-0 opacity-0',
          'group-hover:opacity-100 group-hover:scale-y-100',
        ]"
        :theme="theme"
        @dashboard-event="dashboardHandler"
        @sign-out-event="signOutHandler"
        @toggle-theme-event="handleTheme"
        @my-reviews-event="myReviewsHandler"
        @account-event="accountHandler"
      /> -->
    </div>

    <div class="flex sm:gap-2 gap-2 items-center" v-else>
      <ThemeIcon :theme="theme" @dark-mode-event="handleTheme" />

      <Button
        v-for="(page, index) in authPages"
        :color="selectedPage === index ? 'primary' : 'transparent'"
        :key="page"
        size="small"
        @click="pageHandler(index)"
      >
        {{ page }}
      </Button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Button from "@/shared/components/Button.vue";
import useGetUserStore from "@/composables/useGetUserStore";
import useGetLoadingStore from "@/composables/useGetLoadingStore";
import NavigationMenu from "@/components/ui/navigation/NavigationMenu.vue";
import LoadingSpinner from "@/shared/components/LoadingSpinner.vue";
import { signOut } from "@/api/users";
import { useRouter } from "vue-router";
import { computed, PropType, onMounted, onUnmounted, ref } from "vue";
import ThemeIcon from "@/icons/ThemeIcon.vue";

const { user, resetUser } = useGetUserStore();
const { loading } = useGetLoadingStore();

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const props = defineProps({
  theme: {
    type: String as PropType<"light" | "dark">,
    required: true,
  },
});

const emits = defineEmits(["toggle-theme-event"]);

const isSticky = ref<boolean>(false);
const navigationMenuOpen = ref<boolean>(false);

const authPages = ["LOG IN", "SIGN UP"];
const authRoutes = ["/login", "/sign-up"];

const router = useRouter();

const toggleMenu = () => {
  if (!window.matchMedia("(hover:hover)").matches) {
    navigationMenuOpen.value = !navigationMenuOpen.value;
  }
};

const closeNavigationMenu = () => {
  navigationMenuOpen.value = false;
};

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  isSticky.value = scrollTop >= windowHeight / 2;
};

const selectedPage = computed(() => {
  if (router.currentRoute.value.fullPath === "/login") return 0;
  if (router.currentRoute.value.fullPath === "/sign-up") return 1;
});

const pageHandler = (index: number) => {
  router.push(authRoutes[index]);
};

const accountHandler = () => {
  router.push("/account");
};

const signOutHandler = () => {
  signOut(user.value);
  resetUser();
  router.push("/");
};

const myReviewsHandler = () => {
  router.push(`/my-reviews/${user.value.id}`);
};

const handleTheme = () => {
  console.log("desio se event");
  const value = props.theme === "dark" ? false : true;
  emits("toggle-theme-event", value);
};

const dashboardHandler = () => {
  router.push("/dashboard");
};
</script>
