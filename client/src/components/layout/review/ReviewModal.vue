<template>
  <FormReview
    v-if="userReview?.id"
    :name="name"
    :user-id="userReview.user.id"
    @close-modal-event="emits('close-modal-event')"
    @submit.prevent="submitEditReviewHandler"
  >
    <ExistingReview :review="userReview" @delete-event="deleteReviewHandler" />
  </FormReview>

  <FormReview
    v-else
    :name="name"
    @close-modal-event="emits('close-modal-event')"
    @submit.prevent="submitNewReviewHandler"
  >
    <CreateReview
      :all-fields-completed="allFieldsCompleted"
      :stars-array="starsArray"
      @click-event="ratingClickHandler"
      @mouse-enter-event="mouseEnterHandler"
      @mouse-leave-event="mouseLeaveHandler"
      v-model:content="gameReview.content"
      v-model:rating="gameReview.rating"
    />
  </FormReview>
</template>

<script setup lang="ts">
import useGetUserStore from "src/composables/useGetUserStore";
import ExistingReview from "src/components/layout/review/ExistingReview.vue";
import CreateReview from "src/components/layout/review/CreateReview.vue";
import FormReview from "src/components/form/FormReview.vue";
import { ref, computed, PropType } from "vue";
import { emptyStarsArray } from "src/utils/constants";
import { fillStars } from "src/utils/helpers";
import { GameReviewType, ReviewType } from "src/utils/types";
import { gameReviewSchema } from "src/schemas/gameReview";
import { createReview } from "src/api/reviews";
import { showToast } from "src/utils/toast";
import { deleteReview } from "src/api/reviews";

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

const { user } = useGetUserStore();

const starsArray = ref<string[]>(
  props.userReview?.rating
    ? fillStars(props.userReview.rating - 1)
    : [...emptyStarsArray]
);

const gameReview = ref<GameReviewType>({
  rating: props.userReview?.rating ?? null,
  content: props.userReview?.content ?? "",
});

const allFieldsCompleted = computed(() => {
  return gameReviewSchema.safeParse(gameReview.value).success;
});

const emits = defineEmits([
  "close-modal-event",
  "submit-event",
  "delete-review-event",
]);

const ratingClickHandler = (rating: number) => {
  starsArray.value = fillStars(rating);
  gameReview.value.rating = rating + 1;
};

const mouseEnterHandler = (rating: number) => {
  starsArray.value = fillStars(rating);
};

const mouseLeaveHandler = () => {
  if (!gameReview.value.rating) {
    starsArray.value = [...emptyStarsArray];
  } else {
    starsArray.value = fillStars(gameReview.value.rating - 1);
  }
};

const submitNewReviewHandler = async () => {
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
        console.log("ovo me zanima", data);
        emits("submit-event", data);
        showToast("Review successfully created");
      } else {
        showToast(message, "error");
        emits("close-modal-event");
      }
    } else {
      console.log("ovo kada je edit");
    }
  } catch (error) {
    console.error(error);
  }
};

const submitEditReviewHandler = () => {
  console.log("ovo ide kada se edituje review");
  console.log(gameReview.value);
};

const deleteReviewHandler = async (id: number) => {
  try {
    const response = await deleteReview(id);
    if (response?.ok) {
      emits("delete-review-event", id);
      showToast("Review deleted");
    }
  } catch (error) {
    console.error(error);
    showToast("Unexpected error occured", "error");
  }
};
</script>
