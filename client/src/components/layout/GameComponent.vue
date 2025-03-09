<template>
  <li class="max-w-[300px] flex flex-col gap-2">
    <img :src="game.thumbnail" class="w-full h-[300px] object-cover" />
    <div class="flex flex-col gap-4">
      <h1 class="text-center text-xl">{{ game.name }}</h1>
      <div class="grid grid-cols-2 gap-2">
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
        <div>
          <p>Available on:</p>
          <figure
            class="flex justify-center gap-1 bg-dark-dark-red p-1 rounded-2xl"
          >
            <ConsoleComponent
              v-for="obj in game.consoles"
              :key="obj.console.id"
              :image="obj.console.image"
            />
          </figure>
        </div>
        <ActionButton>
          <template #content>Details</template>
        </ActionButton>
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
import ConsoleComponent from "src/components/layout/ConsoleComponent.vue";
import ActionButton from "src/components/layout/ActionButton.vue";

const props = defineProps({
  game: {
    type: Object as PropType<GameType>,
    required: true,
  },
});

// console.log(props.game);
</script>
