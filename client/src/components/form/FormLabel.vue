<template>
  <label :for="props.id" class="relative w-full h-full rounded-md">
    <slot />
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>
