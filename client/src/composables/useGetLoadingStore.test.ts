import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useLoadingStore } from "@/stores/loadingStore";
import useGetLoadingStore from "@/composables/useGetLoadingStore";

describe("useGetLoadingStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("exposes loading ref from the store", () => {
    const { loading } = useGetLoadingStore();

    expect(loading).toBeDefined();
    expect(loading.value).toBe(false);
  });

  it("updates loading when setLoading is called", () => {
    const { loading, setLoading } = useGetLoadingStore();

    setLoading(true);
    expect(loading.value).toBe(true);

    setLoading(false);
    expect(loading.value).toBe(false);
  });

  it("returns the same store instance under the hood", () => {
    const composable = useGetLoadingStore();
    const store = useLoadingStore();

    composable.setLoading(true);

    expect(store.loading).toBe(true);
  });
});
