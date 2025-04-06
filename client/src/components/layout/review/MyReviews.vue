<template>
  <main class="mx-auto min-h-screen max-w-[1280px]">
    <h1 class="text-5xl text-center py-8">Your Reviews</h1>
    <ul class="flex flex-col gap-4">
      <li
        v-for="review in props.reviews"
        :key="review.id"
        class="flex items-center h-[250px] gap-6"
      >
        <img
          :src="review.game.thumbnail"
          :alt="review.game.thumbnail"
          loading="lazy"
          class="h-full object-cover rounded-2xl"
        />
        <div class="flex flex-col justify-between relative h-full w-full">
          <h2
            class="text-3xl font-semibold italic dark:text-red-500 text-sky-500"
          >
            {{ review.game.name }}
          </h2>
          <p class="text-justify">{{ review.content }}</p>
          <div class="flex flex-col gap-2">
            <GameRating :rating="review.game.averageRating" />
            <h4>Your rating: {{ review.rating.toFixed(1) }}/10</h4>
          </div>
          <footer class="text-sm">
            Reviewed on {{ formattedDate(review.createdAt) }}
          </footer>
          <ActionButton class="absolute bottom-0 right-0">
            Details
          </ActionButton>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import GameRating from "src/components/layout/game/GameRating.vue";
import { MyReviewType } from "src/utils/types";
import { PropType } from "vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import { formattedDate } from "src/utils/helpers";

const props = defineProps({
  reviews: {
    type: Array as PropType<MyReviewType[]>,
    required: true,
  },
});
</script>

<style scoped></style>
