<template>
  <textarea
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
    required: false,
  },
});

const emits = defineEmits(["update:modelValue"]);
</script>
