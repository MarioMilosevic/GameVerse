<template>
  <LoadingSpinner v-if="loading" />
  <SharedLayout v-else :theme="theme" @toggle-theme-event="handleTheme" />
  <RouterView />
</template>

<script lang="ts" setup>
import LoadingSpinner from "src/components/layout/others/LoadingSpinner.vue";
import SharedLayout from "src/components/layout/navigation/SharedLayout.vue";
import useGetLoadingStore from "src/composables/useGetLoadingStore";
import useTheme from "src/composables/useTheme";
import { storageThemeName } from "src/utils/constants";
import { onBeforeMount } from "vue";

const { loading } = useGetLoadingStore();
const { theme, setTheme } = useTheme();

onBeforeMount(() => {
  const savedTheme = localStorage.getItem(storageThemeName);
  if (savedTheme) {
    setTheme(savedTheme === "dark" ? "dark" : "light");
  } else {
    localStorage.setItem(storageThemeName, theme.value);
  }
  if (theme.value === "dark" && savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
});

const handleTheme = (darkMode: boolean) => {
  const newTheme = darkMode ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem(storageThemeName, theme.value);
  if (darkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
};
</script>
