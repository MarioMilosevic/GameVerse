<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    :class="[
      'rounded-3xl cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:translate-y-0',
      colorOptions[props.color],
      buttonSize[props.size],
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const colorOptions = {
  transparent: "bg-transparent ring-1 ring-slate-100",
  lightRed: "bg-red-600 hover:bg-dark-dark-red",
  red: "bg-dark-deep-red hover:bg-dark-dark-red",
  darkRed: "bg-dark-dark-red",
};

const buttonSize = {
  small: "px-2 py-1 text-small",
  medium: "px-6 py-3 text-base",
  big: "px-8 py-4 text-lg",
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
  type: {
    type: String as PropType<"button" | "submit" | "reset" | undefined>,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
