<template>
  <AllGames :games="games"/>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getAllGames, getSingleGame } from "src/api/games";
import { GameType } from "src/utils/types";
import { showToast } from "src/utils/toast";
import AllGames from "src/components/AllGames.vue";

const games = ref<GameType[]>([]);

onBeforeMount(async () => {
  const response = await getAllGames();
  if (response.data) {
    games.value = response.data;
  } else {
    showToast("Unexpected error occured", "error");
  }
});
</script>

<style scoped></style>
