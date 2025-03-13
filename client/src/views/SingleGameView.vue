<template>
  <LoadingSpinner v-if="loading" />
  <main v-else class="mx-auto min-h-screen">
    <img
      :src="singleGame.thumbnail"
      :alt="singleGame.thumbnail"
      class="w-full max-h-screen object-cover opacity-50"
    />
    <SectionComponent>
      <template #header>
        {{ singleGame.name }}
      </template>
      <template #main>
        <YouTube
          :src="singleGame.trailer"
          ref="youtube"
          @ready="playVideo"
          class="col-start-1 col-end-2"
        />
        <div class="col-start-2 col-end-3 flex flex-col justify-between">
          <p>{{ singleGame.description }}</p>
          <div class="flex flex-col gap-2 text-justify">
            <GameInfo>
              <template #title>
                <h3>Writers</h3>
              </template>
              <template #content>
                <p v-for="writer in singleGame.writers" :key="writer">
                  {{ writer }}
                </p>
              </template>
            </GameInfo>
            <GameInfo>
              <template #title>
                <h3>Stars:</h3>
              </template>
              <template #content>
                <p v-for="star in singleGame.stars" :key="star">{{ star }}</p>
              </template>
            </GameInfo>
            <GameInfo>
              <template #title>
                <h3>Gameplay duration:</h3>
              </template>
              <template #content>
                <p>Main story is {{ singleGame.gameplayHours }} hours long</p>
              </template>
            </GameInfo>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-4 col-start-1 col-end-3">
          <GenreComponent
            v-for="genre in singleGame.genres"
            :key="genre.genre.name"
          >
            <template #default>{{ genre.genre.name }} </template>
          </GenreComponent>
        </div>
        <div class="flex items-center gap-8">
          <h3>Available on:</h3>
          <figure
            class="flex justify-center gap-1 bg-dark-dark-red px-2 py-1 rounded-2xl self-start"
          >
            <ConsoleComponent
              v-for="obj in singleGame.consoles"
              :key="obj.console.id"
              :image="obj.console.image"
            />
          </figure>
        </div>
      </template>
    </SectionComponent>

    <SectionComponent>
      <template #main>
        <fieldset class="grid grid-cols-3 col-start-1 col-end-2 gap-4 border border-white">
          <img v-for="img in singleGame.photos" :key="img" :src="img" :alt="img" class="cursor-pointer"/>
        </fieldset>
      </template>
    </SectionComponent>

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
import GameInfo from "src/components/layout/GameInfo.vue";
import ConsoleComponent from "src/components/layout/ConsoleComponent.vue";
import SectionComponent from "src/components/layout/SectionComponent.vue";
import LoadingSpinner from "src/components/layout/LoadingSpinner.vue";
import GenreComponent from "src/components/layout/GenreComponent.vue";
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

<!-- 

In a LinkedIn quick apply I came across this question "How many years of work experience do you have with Application Programming Interfaces (API)?" - this as akin to asking how long have you been breathing. If you have done any sort of software development then you have been working with APIs. Maybe they meant with specific types of API like REST, SOAP or GraphQL but it looks like they don't have a clue about what they are asking

-->
