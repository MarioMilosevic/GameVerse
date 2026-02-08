import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useThemeStore } from "@/stores/theme";

describe("useThemeStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with default theme 'dark'", () => {
    const store = useThemeStore();

    expect(store.theme).toBe("dark");
  });

  it("updates theme when setTheme is called", () => {
    const store = useThemeStore();

    store.setTheme("light");

    expect(store.theme).toBe("light");
  });

  it("allows changing theme multiple times", () => {
    const store = useThemeStore();

    store.setTheme("light");
    expect(store.theme).toBe("light");

    store.setTheme("dark");
    expect(store.theme).toBe("dark");
  });
});
