import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";

export default function useGetUserStore() {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  return {
    user,
    setUser: userStore.setUser,
    resetUser: userStore.resetUser,
  };
}
