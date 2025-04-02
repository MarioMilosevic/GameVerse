<template>
  <button
    class="absolute -top-11 right-0 border bg-sky-500 hover:bg-sky-600 dark:bg-transparent hover:scale-105 dark:border-transparent flex items-center gap-2 px-3 py-1 rounded-2xl cursor-pointer transition-all duration-300 dark:hover:border-slate-50 hover:border dark:hover:bg-slate-950"
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
      v-for="(photo, index) in allPhotos"
      :src="photo"
      :alt="photo"
      class="rounded-xl w-full h-full absolute top-0 left-0 transition-all duration-500"
      :style="{ transform: translateElement(index, selectedImageIndex) }"
    />
  </fieldset>
  <SliderButton class="-right-16" @click="emits('next-event')">
    <template #icon>
      <BaseIcon size="big">
        <RightIcon />
      </BaseIcon>
    </template>
  </SliderButton>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { translateElement } from "src/utils/helpers";
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";
import LeftIcon from "src/icons/LeftIcon.vue";
import RightIcon from "src/icons/RightIcon.vue";
import SliderButton from "src/components/layout/buttons/SliderButton.vue";

defineProps({
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
</script>
