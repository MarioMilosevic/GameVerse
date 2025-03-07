<template>
    <img :src="props.image" :alt="props.image" class="w-[30px]" />
</template>

<script setup lang="ts">

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});
</script>
