<template>
  <main class="min-h-screen">
    <img
      :src="singleGame.thumbnail"
      :alt="singleGame.thumbnail"
      class="w-full max-h-screen object-cover opacity-90 dark:opacity-50"
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
          <p class="text-justify">{{ description }}</p>
          <div class="flex flex-col gap-2 text-justify">
            <GameInfo
              class="border-t border-sky-300 dark:border-t-dark-dark-red pt-1"
            >
              <template #title> Writers: </template>
              <template #content>
                <p>
                  {{ writers.join(" • ") }}
                </p>
              </template>
            </GameInfo>
            <GameInfo>
              <template #title> Stars: </template>
              <template #content>
                <p>
                  {{ stars.join(" • ") }}
                </p>
              </template>
            </GameInfo>
            <GameInfo>
              <template #title> Duration: </template>
              <template #content>
                <p>Main story is {{ gameplayHours }} hours long</p>
              </template>
            </GameInfo>
          </div>
        </div>
      </template>
      <template #submain>
        <div class="flex gap-4 col-start-1 col-end-3">
          <GenreComponent v-for="{ genre } in genres" :key="genre.name">
            <template #default>{{ genre.name }} </template>
          </GenreComponent>
        </div>
        <div class="flex items-center gap-6">
          <h3>Available on:</h3>
          <ConsoleWrapper>
            <ConsoleComponent
              v-for="obj in consoles"
              :key="obj.console.id"
              :image="obj.console.image"
            />
          </ConsoleWrapper>
          <GameRating :rating="singleGame.rating" />
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
    </SectionComponent>

    <OverlayComponent v-if="isGameImageModalOpen">
      <ModalComponent size="big">
        <GameImageModal
          :selectedImageIndex="selectedImageIndex"
          :all-photos="photos"
          @close-modal-event="isGameImageModalOpen = false"
          @next-event="nextImage"
          @prev-event="prevImage"
        />
      </ModalComponent>
    </OverlayComponent>

    <OverlayComponent v-if="isReviewModalOpen">
      <ModalComponent size="small">
        <ReviewModal
          @delete-event="deleteHandler"
          @submit-event="submitModalHandler"
          @close-modal-event="isReviewModalOpen = false"
          :name="name"
          :game-id="singleGame.id"
          :user-review="userReview"
        />
      </ModalComponent>
    </OverlayComponent>
  </main>
</template>

<script setup lang="ts">
import ReviewsSlider from "src/components/layout/review/ReviewsSlider.vue";
import GameInfo from "src/components/layout/game/GameInfo.vue";
import ConsoleComponent from "src/components/layout/game/ConsoleComponent.vue";
import SectionComponent from "src/components/layout/others/SectionComponent.vue";
import GenreComponent from "src/components/layout/game/GenreComponent.vue";
import GameImageModal from "src/components/layout/game/GameImageModal.vue";
import ReviewModal from "src/components/layout/review/ReviewModal.vue";
import OverlayComponent from "src/components/layout/others/OverlayComponent.vue";
import ModalComponent from "src/components/layout/others/ModalComponent.vue";
import ConsoleWrapper from "src/components/layout/game/ConsoleWrapper.vue";
import GameRating from "src/components/layout/game/GameRating.vue";
import YouTube from "vue3-youtube";
import useGetUserStore from "src/composables/useGetUserStore";
import { GameType, NewReviewResponseType } from "src/utils/types";
import { PropType, useTemplateRef, ref, computed } from "vue";

const props = defineProps({
  singleGame: {
    type: Object as PropType<GameType>,
    required: true,
  },
});

const { user } = useGetUserStore();

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

const userReview = computed(() => {
  return props.singleGame.reviews.find(
    (review) => review.user.id === user.value.id
  );
});

const isGameImageModalOpen = ref<boolean>(false);
const isReviewModalOpen = ref<boolean>(false);
const selectedImageIndex = ref<number>(0);
const selectedReviewIndex = ref<number>(0);

const emits = defineEmits(["create-review-event"]);

const youtubeRef = useTemplateRef("youtube");
const playVideo = () => {
  if (youtubeRef.value) {
    youtubeRef.value.playVideo();
  }
};

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
