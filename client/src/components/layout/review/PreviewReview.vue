<template>
  <MainRatingStar :rating="props.rating" />
  <RatingStars :stars-array="starsArray" :cursor-pointer="false" />
  <p class="text-justify border p-4 rounded-2xl">{{ content }}</p>
  <p class="pl-4 self-start text-sm">
    Reviewed on {{ formattedDate(createdAt as string) }}
  </p>

  <div class="flex w-full justify-between">
    <ActionButton color="green" @click="emits('edit-event')"
      >Edit Review</ActionButton
    >
    <ActionButton>Delete Review</ActionButton>
  </div>
</template>

<script setup lang="ts">
import RatingStars from "src/components/layout/review/RatingStars.vue";
import MainRatingStar from "src/components/layout/review/MainRatingStar.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import { fillStars, formattedDate } from "src/utils/helpers";
import { computed } from "vue";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["edit-event"]);

const starsArray = computed(() => {
  return fillStars(props.rating - 1);
});
</script>
