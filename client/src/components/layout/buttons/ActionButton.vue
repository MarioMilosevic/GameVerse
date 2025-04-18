<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'rounded-3xl cursor-pointer transition-all min-h-12 duration-300 hover:transform hover:-translate-y-1 dark:disabled:bg-gray-500 disabled:bg-gray-600 disabled:text-gray-100 disabled:cursor-not-allowed disabled:transform-none disabled:translate-y-0',
      colorOptions[color],
      buttonSize[size],
      positionOptions[position],
    ]"
  >
    <LoadingSpinner v-if="props.isLoading" size="small" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import LoadingSpinner from "src/components/layout/others/LoadingSpinner.vue";

const colorOptions = {
  transparent: "bg-transparent ring-1 ring-slate-100",
  primary:
    "bg-sky-400 hover:bg-sky-500 dark:bg-red-700 dark:hover:bg-dark-dark-red",
  red: "dark:bg-dark-deep-red dark:hover:bg-dark-dark-red",
  darkRed: "dark:bg-dark-dark-red",
  green: "bg-green-700",
};

const positionOptions = {
  relative: "relative",
  absolute: "absolute bottom-0 right-0",
};

const buttonSize = {
  small: "px-2 py-1 text-small",
  medium: "px-6 py-3 text-base",
  big: "px-8 py-4 text-lg",
};

type SizeType = keyof typeof buttonSize;
type ColorType = keyof typeof colorOptions;
type PositionType = keyof typeof positionOptions;

const props = defineProps({
  color: {
    type: String as PropType<ColorType>,
    default: "primary",
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
  position: {
    type: String as PropType<PositionType>,
    default: "relative",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>
