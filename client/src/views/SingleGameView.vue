<template>
  <LoadingSpinner v-if="loading" />
  <main
    v-else
    class="border border-white mx-auto min-h-screen bg-no-repeat bg-cover"
    :style="{
      backgroundImage: `url(${singleGame.thumbnail})`,
    }"
  >
    <!-- <img :src="singleGame.thumbnail" :alt="singleGame.thumbnail" class="absolute top-[12%] right-0 w-full"> -->
    <section
      class="max-w-[1280px] mx-auto border border-black bg-red-400 py-16 flex flex-col gap-4"
    >
      <h1 class="text-5xl text-center">{{ singleGame.name }}</h1>
      <div class="flex gap-4">
        <YouTube :src="singleGame.trailer" ref="youtube" @ready="playVideo" />
        <div>
          <p>{{ singleGame.description }}</p>
          <p v-for="writer in singleGame.writers" :key="writer">{{ writer }}</p>
          <p v-for="star in singleGame.stars" :key="star">{{ star }}</p>
        </div>
      </div>
      <p>Available on:</p>
      <figure
        class="flex justify-center gap-1 bg-dark-dark-red px-2 py-1 rounded-2xl self-start"
      >
        <ConsoleComponent
          v-for="obj in singleGame.consoles"
          :key="obj.console.id"
          :image="obj.console.image"
        />
      </figure>
    </section>
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
import ConsoleComponent from "src/components/layout/ConsoleComponent.vue";
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
    showToast("Unexpected error occured", "error");
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
