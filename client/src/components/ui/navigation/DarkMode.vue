<template>
  <BaseIcon size="big" @click="emits('dark-mode-event')" class="cursor-pointer">
    <MoonIcon v-if="theme === 'dark'" />
    <SunIcon v-else />
  </BaseIcon>
</template>

<script setup lang="ts">
import BaseIcon from "@/icons/BaseIcon.vue";
import MoonIcon from "@/icons/MoonIcon.vue";
import SunIcon from "@/icons/SunIcon.vue";

defineProps({
  theme: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["dark-mode-event"]);
</script>
