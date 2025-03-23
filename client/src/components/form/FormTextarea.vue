<template>
  <textarea
    class="border w-full min-h-24 rounded-xl p-2 mt-4"
    :maxlength="props.maxCharacters"
    :placeholder="props.placeholder"
    @input="(e) => emits('update:modelValue', (e.target as HTMLTextAreaElement)?.value)"
  >
  </textarea>
</template>

<script setup lang="ts">
const props = defineProps({
  maxCharacters: {
    type: Number,
    default: 250,
  },
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});

console.log(props);

const emits = defineEmits(["update:modelValue"]);
</script>
