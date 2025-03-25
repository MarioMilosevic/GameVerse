<template>
  <main class="mx-auto grid grid-cols-3 gap-16 max-w-[1280px] py-8">
    <GameComponent v-for="game in props.games" :key="game.id" :game="game" />
  </main>
</template>

<script setup lang="ts">
import GameComponent from "src/components/layout/game/GameComponent.vue";
import { GameType } from "src/utils/types";
import { PropType } from "vue";

const props = defineProps({
  games: {
    type: Array as PropType<GameType[]>,
  },
});
</script>
