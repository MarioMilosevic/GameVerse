<template>
  <LoadingSpinner v-if="loading" />
  <SingleGame
    v-else
    :single-game="singleGame"
    @create-review-event="createHandler"
    @delete-review-event="deleteHandler"
  />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { getSingleGame } from "src/api/games";
import { onBeforeMount, ref } from "vue";
import { GameType, NewReviewResponseType } from "src/utils/types";
import { showToast } from "src/utils/toast";
import useGetLoadingStore from "src/composables/useGetLoadingStore";
import SingleGame from "src/components/layout/game/SingleGame.vue";
import LoadingSpinner from "src/components/layout/others/LoadingSpinner.vue";

onBeforeMount(async () => {
  try {
    setLoading(true);
    const { message, data } = await getSingleGame(Number(route.params.id));

    if (message) {
      showToast(message, "error");
    } else {
      singleGame.value = data;
    }
  } catch (error) {
    showToast("Unexpected error occured", "error");
    console.error(error);
  } finally {
    setLoading(false);
  }
});

const { loading, setLoading } = useGetLoadingStore();

const route = useRoute();

const singleGame = ref<GameType>({} as GameType);

const createHandler = (response: NewReviewResponseType) => {
  singleGame.value.reviews.push(response.review);
  singleGame.value.rating = Number(response.avgRating);
};

const deleteHandler = (id: number, avgRating: string) => {
  const index = singleGame.value.reviews.findIndex(
    (review) => review.id === id
  );
  if (index !== -1) {
    singleGame.value.reviews.splice(index, 1);
    singleGame.value.rating = Number(avgRating);
  }
};
</script>
