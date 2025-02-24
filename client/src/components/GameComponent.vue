<template>

    <h1>Ovo ce da bude komponenta</h1>
    <img :src="game.thumbnail"/>
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
