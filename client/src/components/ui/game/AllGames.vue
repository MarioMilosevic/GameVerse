<template>
  <main
    class="mx-auto flex flex-col items-center sm:grid sm:grid-cols-3 sm:justify-items-center sm:gap-16 gap-12 px-8 sm:max-w-[1280px] sm:px-0 sm:py-24"
  >
    <GameCard v-for="game in games" :key="game.id" :game="game" />
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
import GameCard from "@/components/ui/game/GameCard.vue";
import AppFooter from "@/shared/components/AppFooter.vue";
import { GameType } from "@/utils/types";
import { PropType } from "vue";

defineProps({
  games: {
    type: Array as PropType<GameType[]>,
  },
});
</script>
