<template>
  <BaseIcon size="big" @click="emits('dark-mode-event')" class="cursor-pointer">
    <MoonIcon v-if="isDark" />
    <SunIcon v-else />
  </BaseIcon>
</template>

<script setup lang="ts">
import BaseIcon from "@/shared/icons/BaseIcon.vue";
import MoonIcon from "@/shared/icons/MoonIcon.vue";
import SunIcon from "@/shared/icons/SunIcon.vue";
import { THEME_OPTIONS, DATA_THEME } from "@/stores/theme/constants";
import type { ThemeType } from "@/stores/theme/types";
import { computed } from "vue";

const props = defineProps<{
  theme: ThemeType;
}>();

const emits = defineEmits(["dark-mode-event"]);

const isDark = computed(() => props.theme === THEME_OPTIONS.DARK);
</script>
