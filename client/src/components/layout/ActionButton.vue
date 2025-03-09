<template>
  <button :class="['px-4 py-2 rounded-3xl', colorOptions[props.color]]">
    <slot name="content" />
  </button>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const colorOptions = {
  lightRed: "bg-dark-highlight-red hover:bg-dark-dark-red",
  red: "bg-dark-deep-red hover:bg-dark-dark-red",
  darkRed: "bg-dark-dark-red",
};

const buttonSize = {
  small: "px-2 py-1",
  medium: "px-3 py-6",
  big: "px-4 py-8",
};
type SizeType = keyof typeof buttonSize;
type ColorType = keyof typeof colorOptions;

const props = defineProps({
  color: {
    type: String as PropType<ColorType>,
    default: "lightRed",
  },
  size: {
    type: String as PropType<SizeType>,
    default: "medium",
  },
});
</script>
