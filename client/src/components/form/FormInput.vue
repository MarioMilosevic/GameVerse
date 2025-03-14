<template>
  <input :value="props.modelValue" class="w-full h-full p-2 rounded-md bg-slate-50 text-slate-950" />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
  },
});
</script>

