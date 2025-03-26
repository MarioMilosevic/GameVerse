<template>
  <label class="relative inline-block w-15 h-8">
    <!-- Hidden checkbox -->
    <input type="checkbox" v-model="checked" class="sr-only peer" />

    <!-- Slider -->
    <span
      class="absolute cursor-pointer top-0 left-0 w-full h-full bg-gray-400 rounded-full transition-colors duration-300 peer-checked:bg-blue-500"
    ></span>

    <!-- Knob -->
    <span
      class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-7"
    ></span>
  </label>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);

const checked = ref(props.modelValue);

const toggle = () => {
  checked.value = !checked.value;
  emit("update:modelValue", checked.value);
};
</script>
