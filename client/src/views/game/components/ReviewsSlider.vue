<template>
  <article
    class="relative px-4 flex flex-col justify-between overflow-x-hidden h-[320px] sm:h-[330px]"
  >
    <PageSubtitle justify="center"> Reviews </PageSubtitle>
    <ReviewCard
      v-for="(review, index) in props.reviews"
      :key="review.id"
      :review="review"
      :style="{ transform: translateElement(index, selectedReviewIndex) }"
    />
    <LeaveReview
      @open-modal-event="emits('open-modal-event')"
      :user-review="userReview"
    />
    <SliderButton
      class="-left-0 sm:-left-0"
      @click="emits('previous-review-event')"
    >
      <template #icon>
        <v-icon name="co-arrow-circle-left" />
      </template>
    </SliderButton>

    <SliderButton
      class="-right-0 sm:right-0"
      @click="emits('next-review-event')"
    >
      <template #icon>
        <v-icon name="co-arrow-circle-right" />
      </template>
    </SliderButton>
  </article>
</template>

<script setup lang="ts">
import SliderButton from "@/shared/components/SliderButton.vue";
import ReviewCard from "@/views/game/components/ReviewCard.vue";
import LeaveReview from "@/views/game/components/LeaveReview.vue";
import PageSubtitle from "@/shared/components/PageSubtitle.vue";
import { PropType } from "vue";
import { ReviewType } from "@/utils/types";
import { translateElement } from "@/utils/helpers";

const props = defineProps({
  reviews: {
    type: Array as PropType<ReviewType[]>,
    required: true,
  },
  selectedReviewIndex: {
    type: Number,
    required: true,
  },
  userReview: {
    type: Object as PropType<ReviewType | undefined>,
    required: false,
  },
});

const emits = defineEmits([
  "open-modal-event",
  "next-review-event",
  "previous-review-event",
]);
</script>
