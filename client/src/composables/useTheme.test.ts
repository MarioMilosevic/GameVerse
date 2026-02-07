import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useThemeStore } from "@/stores/theme";
import useTheme from "@/composables/useTheme";

describe("useTheme composable", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("exposes theme ref from the store", () => {
    const { theme } = useTheme();

    expect(theme).toBeDefined();
    expect(theme.value).toBe("dark");
  });

  it("updates theme when setTheme is called", () => {
    const { theme, setTheme } = useTheme();

    setTheme("dark");
    expect(theme.value).toBe("dark");

    setTheme("light");
    expect(theme.value).toBe("light");
  });

  it("modifies the underlying store instance", () => {
    const composable = useTheme();
    const store = useThemeStore();

    composable.setTheme("dark");

    expect(store.theme).toBe("dark");
  });
});
