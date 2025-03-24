<template>
  <article
    class="relative px-4 flex flex-col justify-between overflow-x-hidden"
  >
    <h2 class="uppercase text-red-600 text-center text-3xl">Reviews</h2>
    <ReviewComponent
      v-for="(review, index) in props.reviews"
      :key="review.id"
      :review="review"
      :style="{ transform: translateElement(index, selectedReviewIndex) }"
    />
    <LeaveReview />
    <SliderButton class="-left-0" @click="previousReview">
      <template #icon>
        <BaseIcon>
          <LeftIcon />
        </BaseIcon>
      </template>
    </SliderButton>

    <SliderButton class="right-0" @click="nextReview">
      <template #icon>
        <BaseIcon>
          <RightIcon />
        </BaseIcon>
      </template>
    </SliderButton>
  </article>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
import LeftIcon from "src/icons/LeftIcon.vue";
import RightIcon from "src/icons/RightIcon.vue";
import SliderButton from "src/components/layout/SliderButton.vue";
import ReviewComponent from "src/components/layout/ReviewComponent.vue";
import LeaveReview from "src/components/layout/LeaveReview.vue";
import { PropType, ref } from "vue";
import { ReviewType } from "src/utils/types";
import { translateElement } from "src/utils/helpers";

const props = defineProps({
  reviews: {
    type: Array as PropType<ReviewType[]>,
    required: true,
  },
});

const selectedReviewIndex = ref<number>(0);

const emits = defineEmits(["open-modal-event"]);

const nextReview = () => {
  if (selectedReviewIndex.value === props.reviews.length - 1) {
    selectedReviewIndex.value = 0;
  } else {
    selectedReviewIndex.value += 1;
  }
}

const previousReview = () => {
   if (selectedReviewIndex.value === 0) {
    selectedReviewIndex.value = props.reviews.length - 1;
  } else {
    selectedReviewIndex.value -= 1;
  }
}

</script>
