import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";

export default function useTheme() {
  const themeStore = useThemeStore();
  const { theme } = storeToRefs(themeStore);
  const { setTheme } = useThemeStore();

  return {
    theme,
    setTheme,
  };
}
