import { storeToRefs } from "pinia";
import { useUserStore } from "src/stores/userStore";

export default function useGetUserStore() {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  const { setUser } = useUserStore();

  return { user, setUser };
}
