import { defineStore } from "pinia";
import { ref } from "vue";

const emptyUser: UserType = {
  id: 0,
  fullName: "",
  image: "",
  role: "USER",
  email: "",
};

type UserType = {
  id: number;
  role: "USER" | "ADMIN" | "GUEST";
  email: string;
  fullName: string;
  image: string;
};

export const useUserStore = defineStore("userStore", () => {
  const user = ref<UserType>({ ...emptyUser });

  function setUser(newUser: UserType) {
    user.value = newUser;
  }

  return {
    user,
    setUser,
  };
});
