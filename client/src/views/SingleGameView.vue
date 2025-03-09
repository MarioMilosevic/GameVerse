<template>
  <h1>Ovo je singl stranica</h1>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { getSingleGame } from "src/api/games";
import { onBeforeMount, ref } from "vue";
import { GameType } from "src/utils/types";
import { showToast } from "src/utils/toast";

const route = useRoute();
onBeforeMount(async () => {
  const { message, data } = await getSingleGame(Number(route.params.id));
  if (message) {
    showToast(message, "error");
  } else {
    console.log(data);
    singleGame.value = data;
  }
});

const singleGame = ref<GameType>();
</script>
