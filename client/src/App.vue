<template>
  <LoadingSpinner v-if="loading" />
  <SharedLayout v-else :theme="theme" @toggle-theme-event="handleTheme" />
  <RouterView />
</template>

<script lang="ts" setup>
import LoadingSpinner from "src/components/layout/others/LoadingSpinner.vue";
import SharedLayout from "src/components/layout/navigation/SharedLayout.vue";
import useGetLoadingStore from "src/composables/useGetLoadingStore";
import {storageThemeName} from 'src/utils/constants'; 
import { ref, onBeforeMount } from "vue";

type theme = "light" | "dark";

const { loading } = useGetLoadingStore();
const theme = ref<theme>("light");

onBeforeMount(() => {
  const savedTheme = localStorage.getItem(storageThemeName);
  if (!savedTheme) {
    localStorage.setItem(storageThemeName, theme.value);
  } else {
    theme.value = savedTheme === "dark" ? "dark" : "light";
  }
  document.documentElement.classList.toggle("dark", savedTheme === "dark");
});

const handleTheme = (darkMode: boolean) => {
  const newTheme = darkMode ? 'dark' : 'light'
  theme.value = newTheme
  localStorage.setItem(storageThemeName, theme.value)
  document.documentElement.classList.toggle('dark', newTheme === 'dark')
};
</script>
