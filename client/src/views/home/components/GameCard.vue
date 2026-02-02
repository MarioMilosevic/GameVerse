<template>
  <article
    class="sm:max-w-[300px] flex flex-col align-center gap-2 rounded-xl relative bg-slate-50 dark:bg-slate-700 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    @click="seeGameDetails(id)"
  >
    <img :src="thumbnail" loading="lazy" class="w-full sm:h-[300px] object-cover rounded-xl" />
    <div class="flex flex-col gap-4 p-4">
      <h1 class="text-justify text-lg sm:text-xl">{{ name }}</h1>
      <div class="grid grid-cols-2 gap-2">
        <GameStat>
          <template #icon>
            <v-icon name="co-clock" :scale="scale" />
          </template>
          <template #value>{{ gameplayHours }}</template>
          <template #name>hours</template>
        </GameStat>
        <GameStat>
          <template #icon>
            <v-icon name="co-star" :scale="scale" />
          </template>
          <template #value>{{ rating }}</template>
          <template #name>rating</template>
        </GameStat>
        <GameStat>
          <template #icon>
            <v-icon name="co-calendar" :scale="scale" />
          </template>
          <template #value>{{ releaseYear }}</template>
        </GameStat>
        <GameStat>
          <template #icon>
            <v-icon name="co-dollar" :scale="scale" />
          </template>
          <template #value>{{ price }}</template>
          <template #name>price</template>
        </GameStat>
        <p>Available on:</p>
        <ConsoleWrapper>
          <img
            v-for="obj in consoles"
            :key="obj.console.id"
            :src="obj.console.image"
            :alt="obj.console.image"
            class="console-image"
          />
        </ConsoleWrapper>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { GameType } from "@/utils/types";
import { useRouter } from "vue-router";
import GameStat from "@/views/game/components/GameStat.vue";
import ConsoleWrapper from "@/views/game/components/ConsoleWrapper.vue";

const props = defineProps({
  game: {
    type: Object as PropType<GameType>,
    required: true,
  },
});

const { name, releaseYear, price, gameplayHours, id, thumbnail, consoles, rating } = props.game;
const router = useRouter();

const seeGameDetails = (id: number) => {
  router.push({ name: "GameDetails", params: { id } });
};

const scale = 1.2;
</script>
