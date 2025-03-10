<template>
  <LoadingSpinner v-if="loading" />
  <main v-else class="border border-white mx-auto">
    <h1>Ovo je singl stranica</h1>
    <YouTube :src="singleGame.trailer" ref="youtube" @ready="playVideo" />
  </main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { getSingleGame } from "src/api/games";
import { onBeforeMount, ref, useTemplateRef } from "vue";
import { GameType } from "src/utils/types";
import { showToast } from "src/utils/toast";
import { useLoadingStore } from "src/stores/loadingStore";
import { storeToRefs } from "pinia";
import LoadingSpinner from "src/components/layout/LoadingSpinner.vue";
import YouTube from "vue3-youtube";

onBeforeMount(async () => {
  try {
    const { message, data } = await getSingleGame(Number(route.params.id));
    if (message) {
      showToast(message, "error");
    } else {
      console.log(data);
      singleGame.value = data;
    }
  } catch (error) {
    showToast("Unexpected error occured", 'error')
    console.error(error);
  } finally {
    loadingStore.setLoading(false);
  }
});

const loadingStore = useLoadingStore();
const { loading } = storeToRefs(loadingStore);

const route = useRoute();
const youtubeRef = useTemplateRef("youtube");

const singleGame = ref<GameType>({} as GameType);

const playVideo = () => {
  if (youtubeRef.value) {
    youtubeRef.value.playVideo();
  }
};
</script>
