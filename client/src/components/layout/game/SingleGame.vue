<template>
  <main class="mx-auto min-h-screen">
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
          <p>{{ description }}</p>
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
          <div class="flex items-center gap-2">
            <BaseIcon>
              <StarIcon />
            </BaseIcon>
            <h3>
              Rated
              <span class="font-semibold"> {{ singleGame.rating }} </span>/10
            </h3>
          </div>
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
          :reviews="singleGame.reviews"
          class="col-start-2 col-end-3"
          @open-modal-event="isReviewModalOpen = true"
        />
      </template>
    </SectionComponent>

    <OverlayComponent v-if="isGameImageModalOpen">
      <template #default>
        <ModalComponent size="big">
          <template #default>
            <GameImageModal
              :selectedImageIndex="selectedImageIndex"
              :all-photos="photos"
              @close-modal-event="isGameImageModalOpen = false"
              @next-event="nextImage"
              @prev-event="prevImage"
            />
          </template>
        </ModalComponent>
      </template>
    </OverlayComponent>

    <OverlayComponent v-if="isReviewModalOpen">
      <template #default>
        <ModalComponent size="small">
          <template #default>
            <ReviewModal
              @close-modal-event="isReviewModalOpen = false"
              @submit-event="submitModalHandler"
              :name="name"
              :game-id="singleGame.id"
              :user-review="userReview"
            />
          </template>
        </ModalComponent>
      </template>
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
import YouTube from "vue3-youtube";
import BaseIcon from "src/icons/BaseIcon.vue";
import StarIcon from "src/icons/StarIcon.vue";
import useGetUserStore from "src/composables/useGetUserStore";
import { GameType, ReviewType } from "src/utils/types";
import { PropType, useTemplateRef, ref, computed } from "vue";

const props = defineProps({
  singleGame: {
    type: Object as PropType<GameType>,
    required: true,
  },
});

console.log('moram odje da provjerim singleGame jer je nekada undefined')

const { user } = useGetUserStore();

const { singleGame } = props;

const {
  name,
  gameplayHours,
  photos,
  description,
  writers,
  stars,
  genres,
  consoles,
  reviews,
} = props.singleGame;

const userReview = computed(() => {
  return reviews.find((review) => review.user.id === user.value.id)
})

const isGameImageModalOpen = ref<boolean>(false);
const isReviewModalOpen = ref<boolean>(false);
const selectedImageIndex = ref<number>(0);



const emits = defineEmits(["review-event"]);

const youtubeRef = useTemplateRef("youtube");
const playVideo = () => {
  if (youtubeRef.value) {
    // youtubeRef.value.playVideo();
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

const submitModalHandler = (review: ReviewType) => {
  isReviewModalOpen.value = false;
  emits("review-event", review);
};
</script>
