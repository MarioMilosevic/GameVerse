import type { ThemeType } from "@/stores/theme/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("themeStore", () => {
  const theme = ref<ThemeType>("dark");

  function setTheme(newTheme: ThemeType) {
    theme.value = newTheme;
  }

  return {
    theme,
    setTheme,
  };
});
