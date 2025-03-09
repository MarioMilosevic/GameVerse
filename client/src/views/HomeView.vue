<template>
  <LoadingSpinner v-if="loading" />
  <AllGames v-else :games="games" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getAllGames } from "src/api/games";
import { GameType } from "src/utils/types";
import { showToast } from "src/utils/toast";
import AllGames from "src/components/layout/AllGames.vue";
import LoadingSpinner from "src/components/layout/LoadingSpinner.vue";
import { useLoadingStore } from "src/stores/loadingStore";
import { storeToRefs } from "pinia";

const games = ref<GameType[]>([]);
const loadingStore = useLoadingStore();
const { loading } = storeToRefs(loadingStore);

onBeforeMount(async () => {
  try {
    const { data, message } = await getAllGames();
    if (message) {
      showToast(message, "error");
    } else {
      games.value = data;
    }
  } catch (error) {
    console.error("Unexpected erorr occured");
  } finally {
    loadingStore.setLoading(false);
  }
});
</script>

<style scoped></style>
