<template>
  <nav
    class="flex justify-between items-center px-8 absolute top-0 right-0 w-full bg-slate-300 dark:bg-slate-900"
  >
    <RouterLink :to="{ name: 'Home' }" class="flex items-center gap-4">
      <img src="/game-controller.png" />
      <h1 class="text-2xl">GameVerse</h1>
    </RouterLink>

    <div
      v-if="user.id"
      class="relative flex items-center -bottom-4 pb-6 gap-6 group"
    >
      <BaseIcon size="big" class="cursor-pointer">
        <MoonIcon v-if="theme === 'dark'"/>
        <SunIcon v-else/>
      </BaseIcon>
      <img :src="user.image" :alt="user.image" class="h-[50px]" />
      <h1 class="text-2xl">{{ firstName }}</h1>

      <NavigationMenu
        class="absolute bottom-0 left-0 translate-y-full scale-y-0 opacity-0 origin-top transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-y-100"
        :theme="theme"
        @sign-out-event="signOutHandler"
        @toggle-theme-event="handleTheme"
      />
    </div>
    <div class="flex gap-4 items-center" v-else>
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
import { ref, computed, PropType } from "vue";

const { user, resetUser } = useGetUserStore();

defineProps({
  theme: {
    type: String as PropType<"light" | "dark">,
    required: true,
  },
});

const emits = defineEmits(["toggle-theme-event"]);

const firstName = computed(() => {
  return user.value.fullName.split(" ")[0];
});

const authPages = ["LOG IN", "SIGN UP"];
const authRoutes = ["/login", "/sign-up"];

const router = useRouter();

const selectedPage = ref<number>(0);

const pageHandler = (index: number) => {
  router.push(authRoutes[index]);
  selectedPage.value = index;
};

const signOutHandler = () => {
  signOut(router, user.value);
  resetUser();
};

const handleTheme = (darkMode: boolean) => {
  emits("toggle-theme-event", darkMode);
};
</script>
