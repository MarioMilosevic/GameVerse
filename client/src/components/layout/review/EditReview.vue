<!-- @mouse-enter-event="mouseEnterEvent"
@mouse-leave-event="mouseLeaveEvent"
@click-event="clickEvent" -->
<template>
  <RatingStars :stars-array="starsArray" :cursor-pointer="isEditing"/>
  <p class="text-justify border p-4 rounded-2xl">{{ review.content }}</p>

  <p class="pl-4 self-start text-sm">
    Reviewed on {{ formattedDate(review.createdAt as string) }}
  </p>

  <div class="flex w-full justify-between">
    <ActionButton color="green">Edit Review</ActionButton>
    <ActionButton>Delete Review</ActionButton>
  </div>
</template>

<script setup lang="ts">
import RatingStars from "src/components/layout/review/RatingStars.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import { ReviewType } from "src/utils/types";
import { PropType, ref } from "vue";
import { formattedDate } from "src/utils/helpers";

const isEditing = ref<boolean>(false)

const props = defineProps({
  review: {
    type: Object as PropType<ReviewType>,
    required: true,
  },
  starsArray: {
    type: Array as PropType<String[]>,
    required: true,
  },
});

console.log(props.review);
</script>
