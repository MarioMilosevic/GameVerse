import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useLoadingStore } from "@/stores/loading";

describe("useLoadingStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with loading set to false", () => {
    const store = useLoadingStore();

    expect(store.loading).toBe(false);
  });

  it("sets loading to true", () => {
    const store = useLoadingStore();

    store.setLoading(true);

    expect(store.loading).toBe(true);
  });

  it("sets loading back to false", () => {
    const store = useLoadingStore();

    store.setLoading(true);
    expect(store.loading).toBe(true);

    store.setLoading(false);
    expect(store.loading).toBe(false);
  });
});
