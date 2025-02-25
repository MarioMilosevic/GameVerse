<template>
  <li class="border border-black h-[500px] w-[300px]"> 
    <img :src="game.thumbnail" class="w-full"/>
    <h2 class="text-center">{{ game.name }}</h2>
    <p>{{ game.description }}</p>
  </li>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { GameType } from "src/utils/types";
const props = defineProps({
  game: {
        type: Object as PropType<GameType>,
        required:true
  },
});

console.log(props.game)
</script>
