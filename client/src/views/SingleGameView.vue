<template>
  <LoadingSpinner v-if="loading" />
  <SingleGame v-else :single-game="singleGame" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { getSingleGame } from "src/api/games";
import { onBeforeMount, ref } from "vue";
import { GameType } from "src/utils/types";
import { showToast } from "src/utils/toast";
import useGetLoadingStore from "src/composables/useGetLoadingStore";
import SingleGame from "src/components/layout/SingleGame.vue";
import LoadingSpinner from "src/components/layout/LoadingSpinner.vue";

onBeforeMount(async () => {
  try {
    setLoading(true);
    const { message, data } = await getSingleGame(Number(route.params.id));
    if (message) {
      showToast(message, "error");
    } else {
      console.log(data);
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
</script>
