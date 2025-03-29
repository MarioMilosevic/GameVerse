<template>
  <form
    class="bg-slate-200 dark:bg-slate-900 relative h-full pt-16 pb-10 px-8 rounded-xl"
    @submit.prevent="submitReviewHandler"
  >
    <BaseIcon
      class="absolute top-2 right-2 cursor-pointer"
      size="big"
      @click="emits('close-modal-event')"
    >
      <XIcon />
    </BaseIcon>

    <div class="absolute -top-10 right-1/2 translate-x-1/2 w-[75px] h-[75px]">
      <v-icon
        class="transform absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transition-all duration-300"
        name="bi-star-fill"
        :scale="scale(5, 0.2)"
      />
      <!-- Ovo ispod je glavna ZVIJEZDA -->
      <h1
        class="text-sky-500 dark:text-red-500 text-3xl absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transition-all duration-300"
        :style="{ scale: scale(1, 0.02) }"
      >
        {{ gameReview.rating ?? "?" }}
      </h1>
    </div>

    <div class="flex flex-col gap-4 items-center w-[500px] px-20 mx-auto">
      <p v-if="!userReview?.id" class="text-sky-500 dark:text-red-500">
        RATE THIS
      </p>
      <h2 class="text-xl">{{ props.name }}</h2>

      <!-- <RatingStars
        :stars-array="starsArray"
        @mouse-leave-event="mouseLeaveHandler"
        @mouse-enter-event="mouseEnterHandler"
        @click-event="ratingClickHandler"
      /> -->

      <!-- prvo ide ako imam review -->

      <EditReview v-if="userReview?.id" />
      <AddReview
        v-else
        :all-fields-completed="allFieldsCompleted"
        :stars-array="starsArray"
        @click-event="ratingClickHandler"
        @mouse-enter-event="mouseEnterHandler"
        @mouse-leave-event="mouseLeaveHandler"
        v-model="gameReview.content"
      />

      <!-- ako nije bio rejting prije -->
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";
import FormTextarea from "src/components/form/FormTextarea.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import useGetUserStore from "src/composables/useGetUserStore";
import RatingStars from "src/components/layout/review/RatingStars.vue";
import EditReview from "src/components/layout/review/EditReview.vue";
import AddReview from "src/components/layout/review/AddReview.vue";
import { ref, computed, PropType } from "vue";
import { emptyStarsArray } from "src/utils/constants";
import { GameReviewType, ReviewType } from "src/utils/types";
import { gameReviewSchema } from "src/schemas/gameReview";
import { createReview } from "src/api/reviews";
import { showToast } from "src/utils/toast";

const props = defineProps({
  content: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  gameId: {
    type: Number,
    required: true,
  },
  userReview: {
    type: Object as PropType<ReviewType | undefined>,
    required: true,
  },
});

console.log(props.userReview);

// const clickEvent = (index: number) => {
//   console.log("click event value", index);
// };
// const mouseEnterEvent = (index: number) => {
//   console.log("mouse enter event value", index);
// };
// const mouseLeaveEvent = () => {
//   console.log("leave event value");
// };

const { user } = useGetUserStore();

const starsArray = ref<string[]>([...emptyStarsArray]);

const gameReview = ref<GameReviewType>({
  rating: props.userReview?.rating ?? null,
  content: props.userReview?.content ?? "",
});

const allFieldsCompleted = computed(() => {
  return gameReviewSchema.safeParse(gameReview.value).success;
});

const scale = (scale: number, increment: number) => {
  if (gameReview.value.rating) {
    scale += gameReview.value.rating * increment;
  }
  return scale;
};

const fillStars = (index: number, length: number = 10) => {
  for (let i = 0; i < length; i++) {
    starsArray.value[i] = i <= index ? "fill" : "empty";
  }
};

if (props.userReview?.rating) {
  fillStars(props.userReview.rating - 1);
}

const emits = defineEmits(["close-modal-event", "submit-event"]);

const ratingClickHandler = (rating: number) => {
  fillStars(rating);
  gameReview.value.rating = rating + 1;
};

const mouseEnterHandler = (rating: number) => {
  fillStars(rating);
};

const mouseLeaveHandler = () => {
  if (!gameReview.value.rating) {
    starsArray.value = [...emptyStarsArray];
  } else {
    fillStars(gameReview.value.rating - 1);
  }
};

const submitReviewHandler = async () => {
  try {
    if (user.value.id) {
      const review = {
        userId: user.value.id,
        gameId: props.gameId,
        rating: gameReview.value.rating,
        content: gameReview.value.content,
      };
      const { data, message } = await createReview(review as ReviewType);
      if (data) {
        emits("submit-event", data);
        showToast("Review successfully created");
      } else {
        showToast(message, "error");
        emits("close-modal-event");
      }
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
