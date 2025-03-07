<template>
  <figure class="border border-purple">
    <img
    class="w-[30px]"
      v-for="image in props.consoles"
      :src="image.console.image"
      :alt="image.console.image"
    />
  </figure>
</template>

<script setup lang="ts">
type ConsoleType = {
  console: {
    image: string;
  };
};

import { PropType } from "vue";
import ConsoleComponent from "src/components/layout/ConsoleComponent.vue";

const props = defineProps({
  consoles: {
    type: Array as PropType<ConsoleType[]>,
    required: true,
  },
});
</script>

<style scoped></style>
