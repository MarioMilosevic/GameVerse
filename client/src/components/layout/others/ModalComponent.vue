<template>
  <div
    :class="[
      'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
      modalSize[size],
    ]"
    to="body"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const modalSize = {
  small: "min-w-1/3 min-h-1/3",
  medium: "w-[90%] h-[40%] sm:w-1/2 sm:h-1/2",
  big: "w-[80%]  h-1/2 sm:w-2/3 sm:h-2/3",
};

defineProps({
  size: {
    type: String as PropType<"small" | "medium" | "big">,
    default: "medium",
  },
});
</script>
