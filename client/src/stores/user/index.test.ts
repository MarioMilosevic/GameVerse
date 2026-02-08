import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "@/stores/user";
import { userRoles } from "@/shared/constants";
import type { UserType } from "@/utils/types";

describe("useUserStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mockUser: UserType = {
    id: 1,
    fullName: "John Doe",
    image: "avatar.png",
    active: true,
    createdDate: "2024-01-01",
    role: userRoles.ADMIN,
    email: "john@example.com",
  };

  it("initializes with an empty user", () => {
    const store = useUserStore();

    expect(store.user).toEqual({
      id: 0,
      fullName: "",
      image: "",
      active: true,
      createdDate: "",
      role: userRoles.USER,
      email: "",
    });
  });

  it("sets user when setUser is called", () => {
    const store = useUserStore();

    store.setUser(mockUser);

    expect(store.user).toEqual(mockUser);
  });

  it("resets user to emptyUser when resetUser is called", () => {
    const store = useUserStore();

    store.setUser(mockUser);
    expect(store.user).toEqual(mockUser);

    store.resetUser();

    expect(store.user).toEqual({
      id: 0,
      fullName: "",
      image: "",
      active: true,
      createdDate: "",
      role: userRoles.USER,
      email: "",
    });
  });

  it("does not keep reference to previous user after reset", () => {
    const store = useUserStore();

    store.setUser(mockUser);
    store.resetUser();

    store.user.fullName = "Hacked";

    expect(store.user.fullName).toBe("Hacked");
    expect(store.user.id).toBe(0);
  });
});
