<template>
  <label :for="id" class="relative w-full h-full rounded-md">
    <slot />
  </label>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>
