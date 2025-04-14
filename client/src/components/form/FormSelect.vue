<template>
  <select class=" w-full px-3 py-2 rounded-md bg-slate-50 text-slate-950 outline-none">
    <option v-for="option in options">{{ option }}</option>
  </select>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
</script>
