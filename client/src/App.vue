<template>
  <SharedLayout :theme="theme" @toggle-theme-event="handleTheme" />
  <RouterView />
</template>

<script lang="ts" setup>
import SharedLayout from "src/components/ui/navigation/SharedLayout.vue";
import useTheme from "src/composables/useTheme";
import { storageThemeName } from "src/utils/constants";
import { THEME_OPTIONS } from "src/constants/theme";
import { DATA_THEME } from "src/constants/theme";
import { onBeforeMount } from "vue";

const { theme, setTheme } = useTheme();
const { dark, light } = THEME_OPTIONS;

onBeforeMount(() => {
  const savedTheme = localStorage.getItem(storageThemeName);
  if (savedTheme) {
    setTheme(savedTheme === dark ? dark : light);
  } else {
    localStorage.setItem(storageThemeName, theme.value);
  }
  if (theme.value === dark && savedTheme) {
    document.documentElement.setAttribute(DATA_THEME, savedTheme);
  } else {
    document.documentElement.removeAttribute(DATA_THEME);
  }
});

const handleTheme = (darkMode: boolean) => {
  const newTheme = darkMode ? dark : light;
  setTheme(newTheme);
  localStorage.setItem(storageThemeName, theme.value);
  if (darkMode) {
    document.documentElement.setAttribute(DATA_THEME, dark);
  } else {
    document.documentElement.removeAttribute(DATA_THEME);
  }
};
</script>
