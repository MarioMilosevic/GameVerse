<template>
  <nav
    class="flex justify-between px-8 absolute top-0 right-0 w-full bg-slate-900"
  >
    <RouterLink :to="{ name: 'Home' }" class="flex items-center gap-4">
      <img src="/game-controller.png" />
      <h1 class="text-2xl">GameVerse</h1>
    </RouterLink>
    <div class="flex gap-4 items-center">
      <ActionButton
        v-for="(page, index) in authPages"
        :color="selectedPage === index ? 'lightRed' : 'transparent'"
        :key="page"
        @click="pageHandler(index)"
      >
        <template #content>
          {{ page }}
        </template>
      </ActionButton>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ActionButton from "src/components/layout/ActionButton.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const authPages = ["LOG IN", "SIGN UP"];
const authRoutes = ["/login", "/sign-up"];

const router = useRouter();

const selectedPage = ref<number>(0);

const pageHandler = (index: number) => {
  router.push(authRoutes[index]);
  selectedPage.value = index;
};
</script>
