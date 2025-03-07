<template>
  <svg
    :xmlns="xmlns"
    :fill="fill"
    :viewBox="viewBox"
    :stroke-width="strokeWidth"
    :stroke="stroke"
    :class="[`icon-${props.size}`]"
    :style="{ cursor }"
    :size="size"
  >
    <slot />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  xmlns: {
    type: String,
    default: 'http://www.w3.org/2000/svg',
  },
  fill: {
    type: String,
    default: 'none',
  },
  viewBox: {
    type: String,
    default: '0 0 24 24',
  },
  strokeWidth: {
    type: String,
    default: '1.5',
  },
  stroke: {
    type: String,
    default: 'currentColor',
  },
  size: {
    type: String,
    default: 'medium',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
})

const cursor = computed(() => {
  return props.isDisabled ? 'not-allowed' : 'pointer'
})

// const iconSizeClass = computed(() => {
//   return props.size
// })


</script>

<!-- <style scoped>

</style> -->