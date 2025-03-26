<template>
  <nav
    class="flex justify-between items-center px-8 absolute top-0 right-0 w-full bg-slate-900"
  >
    <RouterLink :to="{ name: 'Home' }" class="flex items-center gap-4">
      <img src="/game-controller.png" />
      <h1 class="text-2xl">GameVerse</h1>
    </RouterLink>
    <div class="flex gap-4 items-center" v-if="!user.id">
      <ActionButton
        v-for="(page, index) in authPages"
        :color="selectedPage === index ? 'lightRed' : 'transparent'"
        :key="page"
        @click="pageHandler(index)"
      >
          {{ page }}
      </ActionButton>
    </div>

    <div v-else class="h-[50px] flex gap-4 items-center relative border">
      <BaseIcon size="big" :style="{ cursor: 'pointer' }">
        <MoonIcon />
      </BaseIcon>
      <img :src="user.image" :alt="user.image" class="h-full" />
      <h1 class="text-2xl">{{ firstName }}</h1>
      <NavigationMenu class="absolute -bottom-6 translate-y-full left-0" @sign-out-event="signOutHandler"/>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ActionButton from "src/components/layout/buttons/ActionButton.vue"
import useGetUserStore from "src/composables/useGetUserStore";
import NavigationMenu from "src/components/layout/navigation/NavigationMenu.vue";
import BaseIcon from "src/icons/BaseIcon.vue";
// import SunIcon from "src/icons/SunIcon.vue";
import MoonIcon from "src/icons/MoonIcon.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const { user } = useGetUserStore();

const isNavigationBarOpen = ref<boolean>(true);

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

const openModal = () => {
  console.log('radi')
}

const signOutHandler = () => {
  console.log('radi')
}
</script>
