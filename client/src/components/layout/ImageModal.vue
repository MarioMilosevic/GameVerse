<template>
  <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
    <img :src="props.image" :alt="props.image" class="rounded-xl" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import BaseIcon from "src/icons/BaseIcon.vue";
import LeftIcon from "src/icons/LeftIcon.vue";
import RightIcon from "src/icons/RightIcon.vue";


const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  allPhotos: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

// console.log(props)
</script>
