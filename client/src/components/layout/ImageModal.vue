<template>
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-1/2 h-1/2"
  >
    <button
      class="absolute -top-11 right-0 border border-transparent flex gap-2 px-4 py-1 rounded-2xl cursor-pointer transition-all duration-300 hover:border-slate-50 hover:border hover:bg-slate-950"
      @click="emits('close-modal-event')"
    >
      <p>Close</p>
      <BaseIcon>
        <XIcon />
      </BaseIcon>
    </button>
    <BaseIcon
      class="absolute bottom-1/2 -left-12 translate-y-1/2 cursor-pointer"
      size="big"
    >
      <LeftIcon />
    </BaseIcon>
    <fieldset class="w-full h-full relative overflow-x-hidden">
      <img
        v-for="(photo, index) in props.allPhotos"
        :src="photo"
        :alt="photo"
        class="rounded-xl w-full h-full absolute top-0 left-0"
        :style="{ transform: translateImage(index) }"
      />
    </fieldset>
    <BaseIcon
      class="absolute bottom-1/2 translate-y-1/2 -right-12 cursor-pointer"
      size="big"
    >
      <RightIcon />
    </BaseIcon>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";
import LeftIcon from "src/icons/LeftIcon.vue";
import RightIcon from "src/icons/RightIcon.vue";

const props = defineProps({
  selectedImageIndex: {
    type: Number,
    required: true,
  },
  allPhotos: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const emits = defineEmits(["close-modal-event"]);

// const translateImage = ((currentSlideIndex: number) => {
//   const calculation = 100 * (props.selectedImageIndex - currentSlideIndex);
//   return calculation > 0
//     ? `translateX(${calculation}%)`
//     : `translateX(-${Math.abs(calculation)}%)`;
// });

const translateImage = (index: number) => {
  const calculation = 100 * (index - props.selectedImageIndex);
  return `translateX(${calculation}%)`;
};


// const calculation = 100 * (index - currentSlideIndex)

// const translate =
//       calculation > 0
//         ? `translateX(${calculation}%)`
//         : `translateX(-${Math.abs(calculation)}%)`;

console.log(props.selectedImageIndex)
</script>
