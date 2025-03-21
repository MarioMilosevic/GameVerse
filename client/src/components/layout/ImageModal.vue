<template>
  <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
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
    <fieldset class="">
      <img
        :src="props.image"
        :alt="props.image"
        class="rounded-xl w-full"
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
  image: {
    type: String,
    required: true,
  },
  allPhotos: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const emits = defineEmits(['close-modal-event'])

// console.log(props)
</script>
