<template>
  <DefaultLayout :theme="theme" @toggle-theme-event="handleTheme" />
  <RouterView />
</template>

<script lang="ts" setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import useTheme from "@/composables/useTheme";
import { storageThemeName } from "@/utils/constants";
import { THEME_OPTIONS, DATA_THEME } from "@/stores/theme/constants";
import { onBeforeMount } from "vue";
import { ThemeType } from "@/stores/theme/types";

const { theme, setTheme } = useTheme();
const { DARK, LIGHT } = THEME_OPTIONS;

onBeforeMount(() => {
  const savedTheme = localStorage.getItem(storageThemeName);
  if (savedTheme) {
    setTheme(savedTheme === DARK ? DARK : LIGHT);
  } else {
    localStorage.setItem(storageThemeName, theme.value);
  }
  if (theme.value === DARK && savedTheme) {
    document.documentElement.setAttribute(DATA_THEME, savedTheme);
  } else {
    document.documentElement.removeAttribute(DATA_THEME);
  }
});

const handleTheme = (newTheme: ThemeType) => {
  setTheme(newTheme);
  localStorage.setItem(storageThemeName, theme.value);
  if (newTheme === THEME_OPTIONS.DARK) {
    document.documentElement.setAttribute(DATA_THEME, DARK);
  } else {
    document.documentElement.removeAttribute(DATA_THEME);
  }
};
</script>
