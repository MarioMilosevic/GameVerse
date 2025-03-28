<template>
  <div
    class="flex flex-col pl-12 gap-2 absolute top-10 right-1/2 translate-x-1/2 w-full overflow-y-auto transition-all duration-300"
  >
    <div class="flex items-end gap-2">
      <fieldset class="h-[50px] w-[50px]">
        <img :src="image" class="h-full" />
      </fieldset>
      <h2>{{ fullName }}</h2>
      <p>Joined on {{ formattedDate(createdDate) }}</p>
    </div>

    <div class="flex items-center gap-2">
      <div class="flex items-center">
        <v-icon
          v-for="(star, index) in createStarsArray(rating as number)"
          :key="index"
          animation="pulse"
          :fill="theme === 'light' ? 'blue' : 'red'"
          :name="
            star === 'full'
              ? 'bi-star-fill'
              : star === 'half'
              ? 'bi-star-half'
              : 'bi-star'
          "
        />
      </div>
      <p>
        <span> {{ rating }}/10 </span>
        - Reviewed on {{ formattedDate(createdAt as string) }}
      </p>
    </div>
    <p class="pl-2 w-[90%] text-justify">{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
import { ReviewType } from "src/utils/types";
import { PropType } from "vue";
import { formattedDate } from "src/utils/helpers";
import useTheme from "src/composables/useTheme";

const props = defineProps({
  review: {
    type: Object as PropType<ReviewType>,
    required: true,
  },
});

const { theme } = useTheme();

const {
  content,
  createdAt,
  rating,
  user: { fullName, createdDate, image },
} = props.review;

const createStarsArray = (rating: number) => {
  const starsArray = [];
  const scaledRating = (rating / 10) * 5;
  let remainingRating = scaledRating;
  for (let i = 0; i < 5; i++) {
    if (remainingRating >= 1) {
      starsArray.push("full");
    } else if (remainingRating >= 0.5) {
      starsArray.push("half");
    } else {
      starsArray.push("empty");
    }
    remainingRating--;
  }
  return starsArray;
};
</script>
