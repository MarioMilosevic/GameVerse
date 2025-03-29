<template>
  <div class="flex items-center gap-1" @mouseleave="emits('mouse-leave-event')">
    <v-icon
      v-for="(star, index) in starsArray"
      class="cursor-pointer"
      :key="index"
      scale="1.3"
      :name="star === 'empty' ? 'bi-star' : 'bi-star-fill'"
      @mouseenter="emits('mouse-enter-event', index)"
      @click="emits('click-event', index)"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const emits = defineEmits([
  "mouse-leave-event",
  "mouse-enter-event",
  "click-event",
]);

defineProps({
  starsArray: {
    type: Array as PropType<String[]>,
    required: true,
  },
});
</script>
