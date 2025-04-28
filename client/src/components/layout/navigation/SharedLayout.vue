<template>
  <nav
    :class="[
      `flex justify-between items-center sm:px-8 sm:py-4 top-0 px-2 py-2 ${
        isSticky ? 'fixed z-10' : 'absolute'
      } top-0 right-0 w-full bg-slate-300 dark:bg-slate-900 transition-all duration-700`,
    ]"
  >
    <RouterLink :to="{ name: 'Home' }" class="flex items-center gap-4">
      <img src="/controller.png" class="max-h-[20px] sm:max-h-[35px]" />
      <h1 class="sm:text-2xl text-lg">GameVerse</h1>
    </RouterLink>

    <div
      v-if="user.id"
      class="relative flex items-center -bottom-3 pb-3 sm:-bottom-4 sm:pb-6 justify-between group gap-2 sm:gap-0 sm:min-w-[195px]"
      @click="toggleMenu"
      @blur="closeNavigationMenu"
      tabindex="0"
    >
      <BaseIcon size="big" @click="handleTheme" class="cursor-pointer">
        <MoonIcon v-if="theme === 'dark'" />
        <SunIcon v-else />
      </BaseIcon>
      <img
        :src="renderUserImage(user.image)"
        :alt="user.image"
        class="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] rounded-xl object-cover"
      />
      <h1 class="text-lg sm:text-2xl">{{ firstName }}</h1>
      <NavigationMenu
        :class="[
          'absolute bottom-0 left-0 translate-y-full origin-top transition-all duration-500 ease-out',
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
      />
    </div>

    <div class="flex sm:gap-4 gap-2 items-center" v-else>
      <ActionButton
        v-for="(page, index) in authPages"
        :color="selectedPage === index ? 'primary' : 'transparent'"
        :key="page"
        @click="pageHandler(index)"
      >
        {{ page }}
      </ActionButton>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import useGetUserStore from "src/composables/useGetUserStore";
import NavigationMenu from "src/components/layout/navigation/NavigationMenu.vue";
import BaseIcon from "src/icons/BaseIcon.vue";
import SunIcon from "src/icons/SunIcon.vue";
import MoonIcon from "src/icons/MoonIcon.vue";
import { signOut } from "src/api/users";
import { useRouter } from "vue-router";
import { renderUserImage } from "src/utils/helpers";
import { useThrottle } from "src/composables/useThrottle";
import { computed, PropType, onMounted, onUnmounted, ref } from "vue";

const { user, resetUser } = useGetUserStore();

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

const firstName = computed(() => {
  return user.value.fullName.split(" ")[0];
});

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

const handleScroll = useThrottle(() => {
  const scrollTop = window.scrollY;

  const windowHeight = window.innerHeight;
  isSticky.value = scrollTop >= windowHeight / 2;
}, 200);

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
};

const myReviewsHandler = () => {
  router.push(`/my-reviews/${user.value.id}`);
};

const handleTheme = () => {
  const value = props.theme === "dark" ? false : true;
  emits("toggle-theme-event", value);
};

const dashboardHandler = () => {
  router.push("/dashboard");
};
</script>
