<template>
  <article class="relative px-4 flex flex-col gap-4">
    <h2 class="uppercase text-red-600 text-center text-3xl">Reviews</h2>

    <div class="flex items-end gap-2">
      <fieldset class="h-[50px] w-[50px]">
        <img :src="profileImg" class="h-full" />
      </fieldset>
      <h2>Mario Milosevic</h2>
      <p>Joined on 20/03/2025</p>
    </div>

    <div class="flex items-center gap-2">
      <div>
        <v-icon
          v-for="(star, index) in createStarsArray(props.rating)"
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
        <!-- <v-icon v-for="rating in props.rating" speed="slow" animation="pulse" fill="red" name="bi-star-fill" /> -->
        <!-- <v-icon speed="slow" animation="pulse" fill="red" name="bi-star-fill" />
        <v-icon speed="slow" animation="pulse" fill="red" name="bi-star-fill" />
        <v-icon speed="slow" animation="pulse" fill="red" name="bi-star-fill" />
        <v-icon speed="slow" animation="pulse" fill="red" name="bi-star-half" /> -->
      </div>
      <p>
        <span> 4.9/5 </span>
        - Reviewed on July 20, 2023
      </p>
    </div>
    <p>Very nice. Loved it!</p>

    <div
      class="border border-dark-dark-red flex items-center justify-between px-6 py-4 mt-4 rounded-2xl"
    >
      <p class="text-lg">Want to leave a review ?</p>
      <ActionButton>
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
import { profileImg } from "src/utils/constants";
// import FormBlock from "src/components/form/FormBlock.vue";
// import FormInput from "src/components/form/FormInput.vue";

const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
});

const createStarsArray = (rating: number) => {
  const starsArray = [];
  const scaledRating = (rating / 10) * 5; // Convert 10-point rating to 5-star scale
  let remainingRating = scaledRating; // Track how much rating is left to distribute

  for (let i = 0; i < 5; i++) {
    if (remainingRating >= 1) {
      starsArray.push("full");
    } else if (remainingRating >= 0.5) {
      starsArray.push("half");
    } else {
      starsArray.push("empty");
    }
    remainingRating--; // Decrease the remaining rating for the next iteration
  }

  return starsArray;
};
</script>
