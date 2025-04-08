<template>
  <main
    class="mx-auto min-h-screen max-w-[1280px] flex flex-col gap-4 items-center"
  >
    <h1 class="text-5xl text-center py-8">Your Reviews</h1>
    <ul class="flex flex-col gap-4" v-if="reviews.length > 0">
      <li
        v-for="review in reviews"
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
            <h4>Your rating: {{ review.rating }}/10</h4>
          </div>
          <footer class="text-sm">
            Reviewed on {{ formattedDate(review.createdAt) }}
          </footer>
          <ActionButton
            @click="seeGameDetails(review.gameId)"
            position="absolute"
          >
            Details
          </ActionButton>
        </div>
      </li>
    </ul>
    <section v-else class="flex flex-col items-center gap-8">
      <h2 class="text-2xl text-center">You haven't made any reviews yet</h2>
      <ActionButton @click="router.push('/')">View All Games</ActionButton>
    </section>
  </main>
</template>

<script setup lang="ts">
import { MyReviewType } from "src/utils/types";
import { PropType } from "vue";
import { formattedDate } from "src/utils/helpers";
import { useRouter } from "vue-router";
import GameRating from "src/components/layout/game/GameRating.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";

defineProps({
  reviews: {
    type: Array as PropType<MyReviewType[]>,
    required: true,
  },
});

const router = useRouter();

const seeGameDetails = (id: number) => {
  router.push({ name: "GameDetails", params: { id } });
};
</script>
