<template>
  <main class="mx-auto flex flex-col items-center sm:grid sm:grid-cols-3 sm:justify-items-center sm:gap-16 gap-12 px-8 sm:max-w-[1280px] sm:px-0 sm:py-24">
    <GameComponent v-for="game in games" :key="game.id" :game="game" />
  </main>
</template>

<script setup lang="ts">
import GameComponent from "src/components/layout/game/GameComponent.vue";
import { GameType } from "src/utils/types";
import { PropType } from "vue";

defineProps({
  games: {
    type: Array as PropType<GameType[]>,
  },
});
</script>
