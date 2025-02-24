<template>
  <div>hOMEVIE</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getAllGames, getSingleGame } from "src/api/games";
import { GameType } from "src/utils/types";
import { showToast } from "src/utils/toast";

const games = ref<GameType[]>([]);

onBeforeMount(async () => {
  const response = await getAllGames();
  console.log(response);
  if (response.data) {
    games.value = response.data;
  } else {
    showToast("Unexpected error occured", "error");
  }
});
</script>

<style scoped></style>
