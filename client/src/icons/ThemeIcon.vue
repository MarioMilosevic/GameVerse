<template>
  <BaseIcon size="big" @click="emits('dark-mode-event')" class="cursor-pointer">
    <MoonIcon v-if="isDark" />
    <SunIcon v-else />
  </BaseIcon>
</template>

<script setup lang="ts">
import BaseIcon from "@/icons/BaseIcon.vue";
import MoonIcon from "@/icons/MoonIcon.vue";
import SunIcon from "@/icons/SunIcon.vue";
import { THEME_OPTIONS } from "@/constants/theme";
import type { ThemeType } from "@/stores/themeStore";
import { computed } from "vue";

const props = defineProps<{
  theme: ThemeType;
}>();

const emits = defineEmits(["dark-mode-event"]);

const isDark = computed(() => props.theme === THEME_OPTIONS.dark);
</script>
