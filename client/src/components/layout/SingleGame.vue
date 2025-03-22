<template>
  <main class="mx-auto min-h-screen">
    <img
      :src="singleGame.thumbnail"
      :alt="singleGame.thumbnail"
      class="w-full max-h-screen object-cover opacity-50"
    />
    <SectionComponent>
      <template #title>
        {{ name }}
      </template>
      <template #main>
        <YouTube
          :src="singleGame.trailer"
          ref="youtube"
          @ready="playVideo"
          class="col-start-1 col-end-2"
        />
        <div class="col-start-2 col-end-3 flex flex-col justify-between">
          <p>{{ description }}</p>
          <div class="flex flex-col gap-2 text-justify">
            <GameInfo>
              <template #title>
                Writers:
              </template>
              <template #content>
                <p v-for="writer in writers" :key="writer">
                  {{ writer }}
                </p>
              </template>
            </GameInfo>
            <GameInfo>
              <template #title>
                Stars:
              </template>
              <template #content>
                <p v-for="star in stars" :key="star">{{ star }}</p>
              </template>
            </GameInfo>
            <GameInfo>
              <template #title>
                Gameplay duration:
              </template>
              <template #content>
                <p>Main story is {{ gameplayHours }} hours long</p>
              </template>
            </GameInfo>
          </div>
        </div>
      </template>
      <template #submain>
        <div class="flex gap-4 col-start-1 col-end-3">
          <GenreComponent v-for="genre in genres" :key="genre.genre.name">
            <template #default>{{ genre.genre.name }} </template>
          </GenreComponent>
        </div>
        <div class="flex items-center gap-6">
          <h3>Available on:</h3>
          <figure
            class="flex justify-center gap-2 bg-dark-dark-red px-2 py-1 rounded-2xl self-start"
          >
            <ConsoleComponent
              v-for="obj in consoles"
              :key="obj.console.id"
              :image="obj.console.image"
            />
          </figure>
        </div>
      </template>
    </SectionComponent>

    <SectionComponent>
      <template #main>
        <fieldset class="grid grid-cols-3 col-start-1 col-end-2 gap-4">
          <img
            v-for="(img, index) in photos"
            :key="img"
            :src="img"
            :alt="img"
            class="cursor-pointer rounded-xl w-full h-full object-cover"
            @click="openModal(index)"
          />
        </fieldset>
        <ReviewsSlider :rating="7" class="col-start-2 col-end-3" />
      </template>
    </SectionComponent>

    <OverlayComponent v-if="isModalOpen">
      <template #default>
        <ImageModal
          :selectedImageIndex="selectedImageIndex"
          :all-photos="photos"
          @close-modal-event="isModalOpen = false"
          @next-event="nextImage"
          @prev-event="prevImage"
        />
      </template>
    </OverlayComponent>
  </main>
</template>

<script setup lang="ts">
import ReviewsSlider from "src/components/layout/ReviewsSlider.vue";
import GameInfo from "src/components/layout/GameInfo.vue";
import ConsoleComponent from "src/components/layout/ConsoleComponent.vue";
import SectionComponent from "src/components/layout/SectionComponent.vue";
import GenreComponent from "src/components/layout/GenreComponent.vue";
import ImageModal from "src/components/layout/ImageModal.vue";
import OverlayComponent from "./OverlayComponent.vue";
import YouTube from "vue3-youtube";
import { PropType, useTemplateRef, ref } from "vue";
import { GameType } from "src/utils/types";

const props = defineProps({
  singleGame: {
    type: Object as PropType<GameType>,
    required: true,
  },
});

const isModalOpen = ref<boolean>(false);
const selectedImageIndex = ref<number>(0);

const {
  name,
  gameplayHours,
  photos,
  description,
  writers,
  stars,
  genres,
  consoles,
} = props.singleGame;

const youtubeRef = useTemplateRef("youtube");
const playVideo = () => {
  // if (youtubeRef.value) {
  //  youtubeRef.value.playVideo();
  // }
};

const openModal = (imageIndex: number) => {
  isModalOpen.value = true;
  selectedImageIndex.value = imageIndex;
};

const nextImage = () => {
  if (selectedImageIndex.value === photos.length - 1) {
    console.log("sada treba da obrnem");
    selectedImageIndex.value = 0;
  } else {
    selectedImageIndex.value += 1;
  }
};

const prevImage = () => {
  if (selectedImageIndex.value === 0) {
    selectedImageIndex.value = photos.length - 1;
  } else {
    selectedImageIndex.value -= 1;
  }
};
</script>
