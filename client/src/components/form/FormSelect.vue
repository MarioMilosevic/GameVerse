<template>
  <select class=" w-full px-3 py-2 rounded-md bg-slate-50 text-slate-950 outline-none" :value="props.selected">
    <option v-for="option in options">{{ option }}</option>
  </select>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
  selected: {
    type: String,
    required:true
  }
});
</script>
