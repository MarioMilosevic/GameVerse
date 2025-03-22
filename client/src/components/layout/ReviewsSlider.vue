<template>
  <article class=" relative px-4 flex flex-col gap-4">
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
        <v-icon speed="slow" animation="pulse" fill="red" name="bi-star-fill" />
        <v-icon speed="slow" animation="pulse" fill="red" name="bi-star-fill" />
        <v-icon speed="slow" animation="pulse" fill="red" name="bi-star-fill" />
        <v-icon speed="slow" animation="pulse" fill="red" name="bi-star-fill" />
        <v-icon speed="slow" animation="pulse" fill="red" name="bi-star-half" />
      </div>
      <p>
        <span> 4.9/5 </span>
        - Reviewed on July 20, 2023
      </p>
    </div>
    <p>Very nice. Loved it!</p>

    <div
      class="border border-dark-dark-red flex items-center justify-between px-6 py-4 rounded-2xl"
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

// const createStarsArray = (stars: number) => {
//   const starsArray = [];
//   for (let i = 0; i < 5; i++) {
//     const halfStar = i + 0.5;
//     if (stars >= i + 1) starsArray.push(<FaStar color="orange" />);
//     else if (stars >= halfStar) {
//       starsArray.push(<FaRegStarHalfStroke color="orange" />);
//     } else starsArray.push(<FaRegStar color="orange" />);
//   }
//   return starsArray;
// };
</script>
