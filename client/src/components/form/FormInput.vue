<template>
  <input
    @blur="emits('blur-event')"
    @input="(e) => emits('update:modelValue', (e.target as HTMLInputElement)?.value)"
    :value="props.modelValue"
    class="w-full px-3 py-2 rounded-md bg-slate-50 text-slate-950 outline-none border border-transparent focus:border-transparent transition-all duration-100 peer"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
  },
});

const emits = defineEmits(["blur-event", "update:modelValue"]);
</script>
