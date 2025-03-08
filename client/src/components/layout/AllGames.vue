<template>
  <ul >
    <GameComponent v-for="game in props.games" :key="game.id" :game="game"/>
  </ul>
</template>

<script setup lang="ts">
import GameComponent from "src/components/layout/GameComponent.vue";
import { GameType } from "src/utils/types";
import { PropType } from "vue";

const props = defineProps({
    games: {
        type: Array as PropType<GameType[]>
    }
})
</script>

<style scoped></style>
