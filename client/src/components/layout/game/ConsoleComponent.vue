<template>
  <img :src="image" :alt="image" class="w-[20px] sm:w-[30px] text-white" />
</template>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true,
  },
});
</script>
