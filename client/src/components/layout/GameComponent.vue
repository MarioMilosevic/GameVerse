<template>
  <li class="border border-black h-[500px] w-[300px] flex flex-col gap-2">
    <img :src="game.thumbnail" class="w-full" />
    <div class="border border-white flex flex-col">
      <h2 class="text-center">{{ game.name }}</h2>
      <div class="border border-black grid grid-cols-2">
        <GameStat>
          <template #icon>
            <ClockIcon/>
          </template>
          <template #value>{{ game.gameplayHours }}</template>
          <template #name>hours</template>
        </GameStat>
      </div>
    </div>
    </li>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { GameType } from "src/utils/types";
import ClockIcon from "src/icons/ClockIcon.vue";
import GameStat from "src/components/layout/GameStat.vue";

const props = defineProps({
  game: {
    type: Object as PropType<GameType>,
    required: true,
  },
});

console.log(props.game);
</script>
