import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loadingStore", () => {
  const loading = ref<boolean>(true);

  function setLoading(value: boolean) {
    loading.value = value;
  }

  return {
    loading,
    setLoading,
  };
});
