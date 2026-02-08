import { storeToRefs } from "pinia";
import { useLoadingStore } from "@/stores/loading";

export default function useGetLoadingStore() {
  const loadingStore = useLoadingStore();
  const { loading } = storeToRefs(loadingStore);
  const { setLoading } = useLoadingStore();

  return { loading, setLoading };
}
