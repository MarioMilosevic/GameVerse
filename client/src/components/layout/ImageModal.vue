<template>
  <div class="border border-white">
    <img :src="props.image" :alt="props.image" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});
</script>
