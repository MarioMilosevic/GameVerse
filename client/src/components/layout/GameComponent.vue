<template>
  <li class="border border-black h-[500px] w-[300px] flex flex-col gap-2">
    <img :src="game.thumbnail" class="w-full" />
    <div class="border border-white flex flex-col">
      <h2 class="text-center">{{ game.name }}</h2>
      <div class="border border-black grid grid-cols-2">
        <GameStat>
          <template #icon>
            <ClockIcon />
          </template>
          <template #value>{{ game.gameplayHours }}</template>
          <template #name>hours</template>
        </GameStat>
        <GameStat>
          <template #icon>
            <StarIcon />
          </template>
          <template #value>9.6</template>
          <template #name>rating</template>
        </GameStat>

        <GameStat>
          <template #icon>
            <CalendarIcon />
          </template>
          <template #value>{{ game.releaseYear }}</template>
          <template #name>year</template>
        </GameStat>
        <GameStat>
          <template #icon>
            <DollarIcon />
          </template>
          <template #value>{{ game.price }}</template>
          <template #name>price</template>
        </GameStat>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { GameType } from "src/utils/types";
import ClockIcon from "src/icons/ClockIcon.vue";
import StarIcon from "src/icons/StarIcon.vue";
import DollarIcon from "src/icons/DollarIcon.vue";
import CalendarIcon from "src/icons/CalendarIcon.vue";
import GameStat from "src/components/layout/GameStat.vue";

const props = defineProps({
  game: {
    type: Object as PropType<GameType>,
    required: true,
  },
});

console.log(props.game);
</script>
