<template>
  <div
    class="bg-slate-900 relative h-full flex flex-col gap-4 pt-16 items-center"
  >
    <BaseIcon
      class="absolute top-2 right-2 cursor-pointer"
      size="big"
      @click="emits('close-modal-event')"
    >
      <XIcon />
    </BaseIcon>
    <div class="absolute -top-10 right-1/2 translate-x-1/2 w-[75px] h-[75px]">
      <v-icon
        class="transform absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transition-all duration-300"
        name="bi-star-fill"
        :scale="scale"
      />
      <h1
        class="text-red-500 text-3xl absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
      >
        {{ gameRating ?? "?" }}
      </h1>
    </div>
    <p class="text-red-500">RATE THIS</p>
    <h2 class="text-xl">God of War</h2>
    <div class="flex items-center gap-1" @mouseleave="mouseLeaveHandler">
      <v-icon
        v-for="(star, index) in starsArray"
        class="cursor-pointer"
        :key="index"
        scale="1.3"
        :name="star === 'empty' ? 'bi-star' : 'bi-star-fill'"
        @mouseenter="mouseEnterHandler(index)"
        @click="ratingClickHandler(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";
import { computed, ref } from "vue";
import { emptyStarsArray } from "src/utils/constants";

const props = defineProps({
  rating: {
    type: Number,
    required: false,
  },
});

const gameRating = ref<number | null>(props.rating ?? null);

const scale = computed(() => {
  let scale = 5;
  const increment = 0.2;
  if (gameRating.value) {
    scale += gameRating.value * increment;
  }
  return scale;
});

const starsArray = ref<string[]>([...emptyStarsArray]);

const emits = defineEmits(["close-modal-event"]);

const ratingClickHandler = (rating: number) => {
  fillStars(rating);
  gameRating.value = rating + 1;
};

const mouseEnterHandler = (rating: number) => {
  fillStars(rating);
};

const mouseLeaveHandler = () => {
  if (!gameRating.value) {
    starsArray.value = [...emptyStarsArray];
  } else {
    fillStars(gameRating.value - 1);
  }
};

const fillStars = (index: number) => {
  for (let i = 0; i < starsArray.value.length; i++) {
    starsArray.value[i] = i <= index ? "fill" : "empty";
  }
};
</script>
