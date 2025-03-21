<template>
  <button
    class="absolute px-3 py-1 border border-transparent bottom-1/2 rounded-full translate-y-1/2 cursor-pointer hover:bg-slate-950 hover:border-slate-50 transition-all duration-300"
    :style="{ [props.position]: '-4rem' }"
  >
    <slot name="icon" />
  </button>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  position: {
    type: String as PropType<"left" | "right">,
    required: true,
  },
});
</script>
