<template>
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-2/3 h-2/3"
  >
    <button
      class="absolute -top-11 right-0 border border-transparent flex gap-2 px-3 py-1 rounded-2xl cursor-pointer transition-all duration-300 hover:border-slate-50 hover:border hover:bg-slate-950"
      @click="emits('close-modal-event')"
    >
      <p>Close</p>
      <BaseIcon>
        <XIcon />
      </BaseIcon>
    </button>
    <SliderButton class="-left-16" @click="emits('prev-event')">
      <template #icon>
        <BaseIcon size="big">
          <LeftIcon />
        </BaseIcon>
      </template>
    </SliderButton>
    <fieldset class="w-full h-full relative overflow-x-hidden">
      <img
        v-for="(photo, index) in props.allPhotos"
        :src="photo"
        :alt="photo"
        class="rounded-xl w-full h-full absolute top-0 left-0 transition-all duration-500"
        :style="{ transform: translateImage(index) }"
      />
    </fieldset>
    <SliderButton class="-right-16" @click="emits('next-event')">
      <template #icon>
        <BaseIcon size="big">
          <RightIcon />
        </BaseIcon>
      </template>
    </SliderButton>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";
import LeftIcon from "src/icons/LeftIcon.vue";
import RightIcon from "src/icons/RightIcon.vue";
import SliderButton from "src/components/layout/SliderButton.vue";

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

const emits = defineEmits(["close-modal-event", "next-event", "prev-event"]);

const translateImage = (index: number) => {
  const calculation = 100 * (index - props.selectedImageIndex);
  return `translateX(${calculation}%)`;
};
</script>
