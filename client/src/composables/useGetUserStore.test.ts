import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "@/stores/user";
import useGetUserStore from "@/composables/useGetUserStore";
import { UserType } from "@/utils/types";

describe("useGetUserStore", () => {
  beforeEach(() => {
    // Create a fresh Pinia instance before each test
    setActivePinia(createPinia());
  });

  it("exposes user ref from the store", () => {
    const { user } = useGetUserStore();

    expect(user).toBeDefined();
    expect(user.value).toEqual({
      id: 0,
      fullName: "",
      role: "USER",
      email: "",
      image: "",
      active: true,
      createdDate: "",
    });
  });

  it("updates user when setUser is called", () => {
    const { user, setUser } = useGetUserStore();

    const mockUser: UserType = {
      id: 1,
      fullName: "Mario Milosevic",
      role: "ADMIN",
      email: "mario@gmail.com",
      image: "someimage.png",
      active: true,
      createdDate: "05-01-2025",
    };

    setUser(mockUser);

    expect(user.value).toEqual(mockUser);
  });

  it("resets user when resetUser is called", () => {
    const { user, setUser, resetUser } = useGetUserStore();

    const mockUser: UserType = {
      id: 1,
      fullName: "Mario Milosevic",
      role: "ADMIN",
      email: "mario@gmail.com",
      image: "someimage.png",
      active: true,
      createdDate: "05-01-2025",
    };

    setUser(mockUser);
    expect(user.value).toEqual(mockUser);

    resetUser();
    expect(user.value).toEqual({
      id: 0,
      fullName: "",
      role: "USER",
      email: "",
      image: "",
      active: true,
      createdDate: "",
    });
  });

  it("modifies the underlying store instance", () => {
    const composable = useGetUserStore();
    const store = useUserStore();

    const mockUser: UserType = {
      id: 2,
      fullName: "Alice Johnson",
      role: "USER",
      email: "alice@example.com",
      image: "alice.png",
      active: true,
      createdDate: "06-02-2026",
    };

    composable.setUser(mockUser);

    // The store should be updated
    expect(store.user).toEqual(mockUser);
  });
});
