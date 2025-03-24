<template>
  <article class="relative px-4 flex flex-col justify-between">
    <h2 class="uppercase text-red-600 text-center text-3xl">Reviews</h2>
    <ReviewComponent v-for="review in reviews" :key="review.id" :review="review"/>
    <LeaveReview/>
    <SliderButton class="-left-9">
      <template #icon>
        <BaseIcon>
          <LeftIcon />
        </BaseIcon>
      </template>
    </SliderButton>

    <SliderButton class="-right-9">
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
import { PropType } from "vue";
import { ReviewType } from "src/utils/types";

const props = defineProps({
  reviews: {
    type: Array as PropType<ReviewType[]>,
    required: true,
  },
});

const {reviews} = props

const emits = defineEmits(["open-modal-event"]);
</script>
