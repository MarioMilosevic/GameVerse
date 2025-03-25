<template>
  <section class="max-w-[300px] flex flex-col gap-2 relative">
    <img
      :src="game.thumbnail"
      class="w-full h-[300px] object-cover rounded-xl"
    />
    <div class="flex flex-col gap-4">
      <h1 class="text-center text-xl">{{ name }}</h1>
      <div class="grid grid-cols-2 gap-2">
        <GameStat>
          <template #icon>
            <ClockIcon />
          </template>
          <template #value>{{ gameplayHours }}</template>
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
          <template #value>{{ releaseYear }}</template>
        </GameStat>
        <GameStat>
          <template #icon>
            <DollarIcon />
          </template>
          <template #value>{{ price }}</template>
          <template #name>price</template>
        </GameStat>
      </div>
      <p>Available on:</p>
      <figure
        class="flex justify-center gap-1 bg-dark-dark-red px-2 py-1 rounded-2xl self-start"
      >
        <ConsoleComponent
          v-for="obj in game.consoles"
          :key="obj.console.id"
          :image="obj.console.image"
        />
      </figure>
      <ActionButton
        class="absolute bottom-0 right-0"
        size="big"
        @click="seeGameDetails(id)"
      >
        <template #content>Details</template>
      </ActionButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { GameType } from "src/utils/types";
import { useRouter } from "vue-router";
import ClockIcon from "src/icons/ClockIcon.vue";
import StarIcon from "src/icons/StarIcon.vue";
import DollarIcon from "src/icons/DollarIcon.vue";
import CalendarIcon from "src/icons/CalendarIcon.vue";
import GameStat from "src/components/layout/game/GameStat.vue";
import ConsoleComponent from "src/components/layout/game/ConsoleComponent.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";

const props = defineProps({
  game: {
    type: Object as PropType<GameType>,
    required: true,
  },
});

const { name, releaseYear, price, gameplayHours, id } = props.game;
const router = useRouter();

const seeGameDetails = (id: number) => {
  router.push({ name: "GameDetails", params: { id } });
};
</script>
