<!-- @mouse-enter-event="mouseEnterEvent"
@mouse-leave-event="mouseLeaveEvent"
@click-event="clickEvent" -->
<template>
  <RatingStars :stars-array="starsArray" :cursor-pointer="isEditing" />

  <EditReview v-if="isEditing" v-model="review.content" @cancel-event="isEditing = false"/>

  <PreviewReview
    v-else
    @edit-event="isEditing = true"
    :content="review.content"
    :created-at="review.createdAt"
  />
</template>

<script setup lang="ts">
import RatingStars from "src/components/layout/review/RatingStars.vue";
import PreviewReview from "src/components/layout/review/PreviewReview.vue";
import EditReview from "src/components/layout/review/EditReview.vue";
import { ReviewType } from "src/utils/types";
import { PropType, ref } from "vue";

const isEditing = ref<boolean>(false);

defineProps({
  review: {
    type: Object as PropType<ReviewType>,
    required: true,
  },
  starsArray: {
    type: Array as PropType<String[]>,
    required: true,
  },
});
</script>
