<template>
  <div>hOMEVIE</div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { getAllGames } from "src/api/games";

onBeforeMount(async () => {
  const response = await getAllGames();
  console.log(response);
});
</script>

<style scoped></style>
