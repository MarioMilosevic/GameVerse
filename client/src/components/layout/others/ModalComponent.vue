<template>
  <div
    :class="[
      'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
      modalSize[props.size],
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const modalSize = {
  small: "min-w-1/3 min-h-1/3",
  medium: "w-1/2 h-1/2",
  big: "w-2/3 h-2/3",
};

const props = defineProps({
  size: {
    type: String as PropType<"small" | "medium" | "big">,
    default: "medium",
  },
});
</script>
