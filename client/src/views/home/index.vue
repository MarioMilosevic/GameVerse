<template>
  <LoadingSpinner v-if="loading" />
  <AllGames v-else :games="games" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getAllGames } from "@/api/games";
import { GameType } from "@/utils/types";
import { showToast } from "@/utils/toast";
import { UNEXPECTED_ERROR_OCCURED, ERROR } from "@/constants/errors";
import AllGames from "@/components/ui/game/AllGames.vue";
import LoadingSpinner from "@/components/ui/others/LoadingSpinner.vue";
import useGetLoadingStore from "@/composables/useGetLoadingStore";

const games = ref<GameType[]>([]);
const { loading, setLoading } = useGetLoadingStore();

onBeforeMount(async () => {
  try {
    setLoading(true);
    const { data, message } = await getAllGames();
    if (message) {
      showToast(message, ERROR);
    } else {
      games.value = data;
    }
  } catch (error) {
    console.error(UNEXPECTED_ERROR_OCCURED);
    showToast(UNEXPECTED_ERROR_OCCURED, ERROR);
  } finally {
    setLoading(false);
  }
});
</script>
