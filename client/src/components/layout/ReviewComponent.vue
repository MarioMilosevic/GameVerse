<template>
  <div class="flex items-end gap-2">
    <fieldset class="h-[50px] w-[50px]">
      <img :src="image" class="h-full" />
    </fieldset>
    <h2>{{ fullName }}</h2>
    <p>Joined on {{ createdDate }}</p>
  </div>

  <div class="flex items-center gap-2">
    <div class="flex items-center">
      <v-icon
        v-for="(star, index) in createStarsArray(props.review.rating)"
        :key="index"
        animation="pulse"
        speed="slow"
        fill="red"
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
      <span> 4.9/5 </span>
      - Reviewed on {{ createdAt }}
    </p>
  </div>
  <p>{{ content }}</p>
</template>

<script setup lang="ts">
import { ReviewType } from "src/utils/types";
import { PropType } from "vue";

const props = defineProps({
  review: {
    type: Object as PropType<ReviewType>,
    required: true,
  },
});

const {
  content,
  createdAt,
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
