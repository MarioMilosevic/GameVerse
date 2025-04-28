<template>
  <LoadingSpinner v-if="loading" />
  <SharedLayout :theme="theme" @toggle-theme-event="handleTheme" />
  <RouterView />
  <!-- <FooterComponent v-if="user.id" /> -->
</template>

<script lang="ts" setup>
import LoadingSpinner from "src/components/layout/others/LoadingSpinner.vue";
import SharedLayout from "src/components/layout/navigation/SharedLayout.vue";
// import FooterComponent from "src/components/layout/others/FooterComponent.vue";
import useGetLoadingStore from "src/composables/useGetLoadingStore";
import useTheme from "src/composables/useTheme";
import useGetUserStore from "src/composables/useGetUserStore";
import { storageThemeName } from "src/utils/constants";
import { onBeforeMount } from "vue";

const { loading } = useGetLoadingStore();
const { theme, setTheme } = useTheme();
// const { user } = useGetUserStore();

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
