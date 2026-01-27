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
    <Logo />

    <div
      v-if="user.id"
      class="flex items-center lg:justify-between rounded-xl relative sm:gap-2 gap-4"
      @click="toggleMenu"
      @blur="closeNavigationMenu"
      tabindex="0"
    >
      <NavigationMenu
        :class="[
          '',
          navigationMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-100 opacity-100',
          'group-hover:opacity-100 group-hover:scale-y-100',
        ]"
        :theme="theme"
        @navigation="handleNavigation"
        @toggle-theme-event="handleTheme"
      />
    </div>

    <div class="flex sm:gap-2 gap-2 items-center" v-else>
      <v-icon v-if="theme === THEME_OPTIONS.DARK" name="md-darkmode" @toggle-theme-event="handleTheme" />
      <v-icon v-if="theme === THEME_OPTIONS.LIGHT" name="md-lightmode" @toggle-theme-event="handleTheme" />
      <!-- Todo add primary and transparent into constants maybe ? -->
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
import NavigationMenu from "@/layouts/components/NavigationMenu.vue";
import LoadingSpinner from "@/shared/components/LoadingSpinner.vue";
import { THEME_OPTIONS } from "@/stores/theme/constants";
import type { ThemeType } from "@/stores/theme/types";
import { signOut } from "@/api/users";
import { useRouter } from "vue-router";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { navLinkType } from "./types";
import Logo from "@/shared/components/Logo.vue";

const { user, resetUser } = useGetUserStore();
const { loading } = useGetLoadingStore();

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const props = defineProps<{
  theme: ThemeType;
}>();

const emits = defineEmits<{
  (e: "toggle-theme-event", value: ThemeType): void;
}>();

const isSticky = ref<boolean>(false);
const navigationMenuOpen = ref<boolean>(false);

const authPages = ["LOG IN", "SIGN UP"];
const authRoutes = ["/login", "/sign-up"];

const router = useRouter();

const toggleMenu = () => {
  // Todo: check if this function is neccessary ?
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

const handleAccount = () => {
  router.push("/account");
};

const handleSignOut = () => {
  signOut(user.value);
  resetUser();
  router.push("/");
};

const handleMyReviews = () => {
  router.push(`/my-reviews/${user.value.id}`);
};

const handleTheme = () => {
  const updatedTheme: ThemeType = props.theme === THEME_OPTIONS.DARK ? THEME_OPTIONS.LIGHT : THEME_OPTIONS.DARK;
  emits("toggle-theme-event", updatedTheme);
};

const handleDashboard = () => {
  router.push("/dashboard");
};

const handleNavigation = (link: navLinkType) => {
  switch (link.text) {
    case THEME_OPTIONS.DARK:
    case THEME_OPTIONS.LIGHT:
      handleTheme();
      break;
    case "Dashboard":
      handleDashboard();
      break;
    case "Account":
      handleAccount();
      break;
    case "My Reviews":
      handleMyReviews();
      break;
    case "Log Out":
      handleSignOut();
      break;
  }
};
</script>
