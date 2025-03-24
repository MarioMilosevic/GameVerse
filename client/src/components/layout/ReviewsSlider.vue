<template>
  <article class="relative px-4 flex flex-col gap-4">
    <h2 class="uppercase text-red-600 text-center text-3xl">Reviews</h2>
    <ReviewComponent v-for="review in props.reviews" :key="review.id" :review="review"/>
    <div
      class="border border-dark-dark-red flex items-center justify-between px-6 py-4 mt-4 rounded-2xl"
    >
      <p class="text-lg">Want to leave a review ?</p>
      <ActionButton @click="emits('open-modal-event')">
        <template #content> Click here </template>
      </ActionButton>
    </div>
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
import ActionButton from "src/components/layout/ActionButton.vue";
import SliderButton from "src/components/layout/SliderButton.vue";
import ReviewComponent from "src/components/layout/ReviewComponent.vue";
import { PropType } from "vue";
import { ReviewType } from "src/utils/types";

const props = defineProps({
  reviews: {
    type: Array as PropType<ReviewType[]>,
    required: true,
  },
});

const emits = defineEmits(["open-modal-event"]);
</script>
