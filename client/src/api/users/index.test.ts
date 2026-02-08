import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  createUser,
  loginUser,
  signOut,
  getUserData,
  getUserReviews,
  editUserNameAndEmail,
  getUsers,
  editUserProfile,
  deleteUser,
  disableUserAccount,
  updateUserImage,
} from "./index";
import { UserType, SignUpCredentialsType, LoginCredentialsType, AccountSettingsType } from "@/utils/types";
import { gameVerseToken } from "@/shared/constants";
import { showToast } from "@/utils/helpers/showToast";

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

vi.mock("@/utils/helpers/showToast", () => ({
  showToast: vi.fn(),
}));

const mockShowToast = vi.mocked(showToast);

describe("users API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("createUser", () => {
    it("creates a new user successfully", async () => {
      const newUser: SignUpCredentialsType = {
        fullName: "John Doe",
        email: "john@example.com",
        password: "password123",
        passwordConfirm: "password123",
      };
      const mockResponse = { id: 1, ...newUser };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await createUser(newUser);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users/sign-up"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await createUser({
        fullName: "Test",
        email: "test@test.com",
        password: "pass",
        passwordConfirm: "pass",
      });

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("loginUser", () => {
    it("logs in a user successfully", async () => {
      const credentials: LoginCredentialsType = {
        email: "john@example.com",
        password: "password123",
      };
      const mockResponse = { token: "jwt-token", user: { id: 1 } };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await loginUser(credentials);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users/login"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("signOut", () => {
    it("removes token from localStorage and shows toast with first name", () => {
      const removeItemMock = vi.fn();
      const originalLocalStorage = globalThis.localStorage;
      globalThis.localStorage = { removeItem: removeItemMock } as unknown as Storage;

      const user: UserType = {
        id: 1,
        fullName: "John Doe",
        email: "john@example.com",
        role: "USER",
        image: "",
        createdDate: "",
        active: true,
      };

      signOut(user);

      expect(removeItemMock).toHaveBeenCalledWith(gameVerseToken);

      vi.advanceTimersByTime(500);
      expect(mockShowToast).toHaveBeenCalledWith("John signed out");
      globalThis.localStorage = originalLocalStorage;
    });

    it("shows custom message when provided", () => {
      const removeItemMock = vi.fn();
      const originalLocalStorage = globalThis.localStorage;
      globalThis.localStorage = { removeItem: removeItemMock } as unknown as Storage;

      const user: UserType = {
        id: 1,
        fullName: "Jane Doe",
        email: "jane@example.com",
        role: "USER",
        image: "",
        createdDate: "",
        active: true,
      };

      signOut(user, "Session expired");

      vi.advanceTimersByTime(500);
      expect(mockShowToast).toHaveBeenCalledWith("Session expired");
      globalThis.localStorage = originalLocalStorage;
    });
  });

  describe("getUserData", () => {
    it("fetches user data with authorization header", async () => {
      const mockUser = { id: 1, fullName: "John Doe" };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUser),
      });

      const result = await getUserData("test-token");

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users/user"),
        expect.objectContaining({
          headers: { Authorization: "Bearer test-token" },
        })
      );
      expect(result).toEqual(mockUser);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await getUserData("invalid-token");

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("getUserReviews", () => {
    it("fetches user reviews by id", async () => {
      const mockReviews = [{ id: 1, comment: "Great game!" }];
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockReviews),
      });

      const result = await getUserReviews(1);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/users/reviews/1"));
      expect(result).toEqual(mockReviews);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await getUserReviews(999);

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("editUserNameAndEmail", () => {
    it("updates user name and email", async () => {
      const updateData: AccountSettingsType = {
        fullName: "Jane Doe",
        email: "jane@example.com",
      };
      const mockResponse = { id: 1, ...updateData };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await editUserNameAndEmail(1, updateData);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users/1"),
        expect.objectContaining({
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await editUserNameAndEmail(1, { fullName: "Test", email: "test@test.com" });

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("getUsers", () => {
    it("fetches users with pagination and filters", async () => {
      const mockResponse = { users: [{ id: 1 }], total: 1 };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await getUsers(1, "A-Z", "john");

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/users\?page=1&sort=A-Z&search=john/)
      );
      expect(result).toEqual(mockResponse);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await getUsers(1, "A-Z", "");

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("editUserProfile", () => {
    it("edits user profile via dashboard endpoint", async () => {
      const editedUser: UserType = {
        id: 1,
        fullName: "John Updated",
        email: "john.updated@example.com",
        role: "ADMIN",
        image: "",
        createdDate: "",
        active: true,
      };
      const mockResponse = { ...editedUser };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await editUserProfile(editedUser);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users/dashboard/1"),
        expect.objectContaining({
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedUser),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await editUserProfile({
        id: 1,
        fullName: "Test",
        email: "test@test.com",
        role: "USER",
        image: "",
        createdDate: "",
        active: true,
      });

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("deleteUser", () => {
    it("deletes a user successfully", async () => {
      const mockResponse = { ok: true };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await deleteUser(1);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users/dashboard/1"),
        expect.objectContaining({
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await deleteUser(999);

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("disableUserAccount", () => {
    it("disables a user account", async () => {
      const mockResponse = { id: 1, active: false };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await disableUserAccount(1);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users/disable/1"),
        expect.objectContaining({
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await disableUserAccount(999);

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("updateUserImage", () => {
    it("updates user image with FormData", async () => {
      const mockFile = new File(["test"], "test.png", { type: "image/png" });
      const mockResponse = { id: 1, image: "new-image-url" };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await updateUserImage(1, mockFile);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users/image/1"),
        expect.objectContaining({
          method: "PATCH",
          body: expect.any(FormData),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const mockFile = new File(["test"], "test.png", { type: "image/png" });
      const result = await updateUserImage(999, mockFile);

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });
});
