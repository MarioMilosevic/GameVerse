<template>
  <main class="min-h-screen">
    <img :src="singleGame.thumbnail" :alt="singleGame.thumbnail" class="sm:h-[150px] h-[75px] w-full object-cover" />
    <ContentSection>
      <template #title>
        {{ name }}
      </template>
      <template #main>
        <iframe class="aspect-video w-full h-full" :src="embedTrailerUrl"> </iframe>
        <div class="col-start-2 col-end-3 flex flex-col gap-4 justify-between">
          <p class="text-justify text-sm sm:text-base">{{ description }}</p>
          <div class="flex flex-col justify-center gap-2 text-justify">
            <GameInfo class="border-t border-sky-300 dark:border-t-dark-dark-red pt-1">
              <template #title> Writers: </template>
              <template #content>
                {{ writers.join(" • ") }}
              </template>
            </GameInfo>
            <GameInfo>
              <template #title> Stars: </template>
              <template #content>
                {{ stars.join(" • ") }}
              </template>
            </GameInfo>
            <GameInfo>
              <template #title> Duration: </template>
              <template #content> Main story is {{ gameplayHours }} hours long </template>
            </GameInfo>
          </div>
        </div>
      </template>
      <template #submain>
        <div class="grid grid-cols-2 sm:flex gap-4 sm:col-start-1 sm:col-end-3">
          <GenreTag v-for="{ genre } in genres" :key="genre.name">
            <template #default>{{ genre.name }} </template>
          </GenreTag>
        </div>
        <div class="flex items-center justify-between sm:gap-6 sm:justify-start">
          <h3>Available on:</h3>
          <ConsoleWrapper>
            <img
              v-for="obj in consoles"
              :key="obj.console.id"
              :src="obj.console.image"
              :alt="obj.console.image"
              class="console-image"
            />
          </ConsoleWrapper>
          <GameRating :rating="singleGame.rating" />
        </div>
      </template>
    </ContentSection>

    <ContentSection>
      <template #main>
        <fieldset class="grid grid-cols-3 col-start-1 col-end-2 gap-4">
          <img
            v-for="(img, index) in photos"
            :key="img"
            :src="img"
            :alt="img"
            class="cursor-pointer rounded-xl w-full h-full max-h-[200px] object-cover"
            @click="openImageModal(index)"
          />
        </fieldset>
        <ReviewsSlider
          :reviews="props.singleGame.reviews"
          :selected-review-index="selectedReviewIndex"
          :user-review="userReview"
          class="col-start-2 col-end-3"
          @open-modal-event="isReviewModalOpen = true"
          @next-review-event="nextReview"
          @previous-review-event="previousReview"
        />
      </template>
    </ContentSection>

    <BaseOverlay v-if="isGameImageModalOpen">
      <GameImageModal
        :selectedImageIndex="selectedImageIndex"
        :all-photos="photos"
        @close-modal-event="isGameImageModalOpen = false"
        @next-event="nextImage"
        @prev-event="prevImage"
      />
    </BaseOverlay>
    <BaseOverlay v-if="isReviewModalOpen">
      <BaseModal size="small">
        <ReviewModal
          @delete-event="deleteHandler"
          @submit-event="submitModalHandler"
          @close-modal-event="isReviewModalOpen = false"
          :name="name"
          :game-id="singleGame.id"
          :user-review="userReview"
        />
      </BaseModal>
    </BaseOverlay>
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
import ReviewsSlider from "@/views/game/components/ReviewsSlider.vue";
import GameInfo from "@/views/game/components/GameInfo.vue";
import ContentSection from "@/views/game/components/ContentSection.vue";
import GenreTag from "@/views/game/components/GenreTag.vue";
import GameImageModal from "@/views/game/components/GameImageModal.vue";
import ReviewModal from "@/views/game/components/ReviewModal.vue";
import BaseOverlay from "@/shared/components/BaseOverlay.vue";
import BaseModal from "@/shared/components/BaseModal.vue";
import ConsoleWrapper from "@/views/game/components/ConsoleWrapper.vue";
import AppFooter from "@/shared/components/AppFooter.vue";
import GameRating from "@/views/game/components/GameRating.vue";
import useGetUserStore from "@/composables/useGetUserStore";
import { GameType, NewReviewResponseType } from "@/utils/types";
import { createVideoUrl } from "@/utils/helpers/createVideoUrl";
import { PropType, ref, computed } from "vue";

const props = defineProps({
  singleGame: {
    type: Object as PropType<GameType>,
    required: true,
  },
});

const { user } = useGetUserStore();

const { name, gameplayHours, photos, description, writers, stars, genres, consoles } = props.singleGame;

const userReview = computed(() => {
  return props.singleGame.reviews.find((review) => review.user.id === user.value.id);
});

const isGameImageModalOpen = ref<boolean>(false);
const isReviewModalOpen = ref<boolean>(false);
const selectedImageIndex = ref<number>(0);
const selectedReviewIndex = ref<number>(0);

const emits = defineEmits(["create-review-event"]);

const embedTrailerUrl = computed(() => {
  if (!props.singleGame.trailer) return "";
  const videoIdMatch = props.singleGame.trailer.match(/(?:youtu\.be\/|v=)([0-9A-Za-z_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : "";
  return createVideoUrl(videoId);
});

const openImageModal = (imageIndex: number) => {
  isGameImageModalOpen.value = true;
  selectedImageIndex.value = imageIndex;
};

const nextImage = () => {
  if (selectedImageIndex.value === photos.length - 1) {
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

const nextReview = () => {
  if (selectedReviewIndex.value === props.singleGame.reviews.length - 1) {
    selectedReviewIndex.value = 0;
  } else {
    selectedReviewIndex.value += 1;
  }
};

const previousReview = () => {
  if (selectedReviewIndex.value === 0) {
    selectedReviewIndex.value = props.singleGame.reviews.length - 1;
  } else {
    selectedReviewIndex.value -= 1;
  }
};

const submitModalHandler = (response: NewReviewResponseType) => {
  isReviewModalOpen.value = false;
  emits("create-review-event", response);
};

const deleteHandler = () => {
  isReviewModalOpen.value = false;
  selectedReviewIndex.value = 0;
};
</script>
