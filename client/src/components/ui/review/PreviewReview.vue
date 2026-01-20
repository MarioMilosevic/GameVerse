<template>
  <MainRatingStar :rating="props.rating" />
  <RatingStars :stars-array="starsArray" :cursor-pointer="false" />
  <p class="text-justify border p-4 rounded-xl w-full">{{ content }}</p>
  <p class="pl-4 self-start text-sm">
    Reviewed on {{ formattedDate(createdAt as string) }}
  </p>

  <div class="flex w-full justify-between">
    <Button color="green" @click="emits('edit-event')">Edit Review</Button>
    <Button @click="emits('delete-event')">Delete Review</Button>
  </div>
</template>

<script setup lang="ts">
import RatingStars from "@/components/ui/review/RatingStars.vue";
import MainRatingStar from "@/components/ui/review/MainRatingStar.vue";
import Button from "@/shared/components/Button.vue";
import { fillStars, formattedDate } from "@/utils/helpers";
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
    type: [Number, null],
    required: true,
  },
});

const emits = defineEmits(["edit-event", "delete-event"]);

const starsArray = computed(() => fillStars((props.rating ?? 0) - 1));
</script>
