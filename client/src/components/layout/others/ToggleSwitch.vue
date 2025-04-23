<template>
  <label class="relative cursor-pointer w-6 h-4 sm:w-15 sm:h-8">
    <input
      type="checkbox"
      :checked="modelValue"
      class="sr-only peer"
      @change="toggleCheckbox"
    />
    <span
      class="absolute top-0 left-0 w-full h-full bg-gray-400 rounded-full transition-colors duration-300 peer-checked:bg-blue-500"
    ></span>
    <span
      class="absolute left-[1px] top-1 sm:left-1 sm:top-1 w-[9px] h-[9px] sm:w-6 sm:h-6 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-3 sm:peer-checked:translate-x-7"
    ></span>
  </label>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const toggleCheckbox = (e: Event) => {
  const value = (e.target as HTMLInputElement).checked;
  emits("update:modelValue", value);
};
</script>
