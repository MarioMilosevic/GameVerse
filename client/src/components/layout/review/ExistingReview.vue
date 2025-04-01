<template>
  <EditReview
    v-if="isEditing"
    :content="review.content"
    :rating="review.rating"
    @mouse-enter-event="mouseEnterEvent"
    @mouse-leave-event="mouseLeaveEvent"
    @click-event="clickEvent"
    @cancel-event="isEditing = false"
  />

  <PreviewReview
    v-else
    @edit-event="isEditing = true"
    :rating="review.rating"
    :content="review.content"
    :created-at="review.createdAt"
  />
</template>

<script setup lang="ts">

import PreviewReview from "src/components/layout/review/PreviewReview.vue";
import EditReview from "src/components/layout/review/EditReview.vue";
import { ReviewType } from "src/utils/types";
import { PropType, ref } from "vue";
import { fillStars } from "src/utils/helpers";

const isEditing = ref<boolean>(false);

const props = defineProps({
  review: {
    type: Object as PropType<ReviewType>,
    required: true,
  },
});

const editingStarsArray = ref(fillStars((props.review.rating ?? 0) - 1));
const editRating = ref<number>(props.review.rating ?? 0);

const mouseEnterEvent = (rating: number) => {
  if (isEditing.value) {
    editingStarsArray.value = fillStars(rating);
  }
};

const mouseLeaveEvent = () => {
  if (isEditing.value) {
    editingStarsArray.value = fillStars(editRating.value - 1);
  }
};
const clickEvent = (rating: number) => {
  if (isEditing.value) {
    editingStarsArray.value = fillStars(rating);
    editRating.value = rating + 1;
  }
};

// const scale = (scale: number, increment: number) => {
//   if (gameReview.value.rating) {
//     scale += gameReview.value.rating * increment;
//   }
//   return scale;
// };
</script>
