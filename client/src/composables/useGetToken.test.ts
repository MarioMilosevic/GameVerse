import { describe, it, expect, beforeEach, afterEach, vi, Mock } from "vitest";
import useGetJWT from "./useGetToken";
import { gameVerseToken } from "@/shared/constants";

describe("useGetJWT", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns null if token is not in localStorage", () => {
    (localStorage.getItem as Mock).mockReturnValue(null);

    const token = useGetJWT();

    expect(token).toBeNull();
    expect(localStorage.getItem).toHaveBeenCalledWith(gameVerseToken);
  });

  it("returns the token if it exists in localStorage", () => {
    const mockToken = "abc123";
    (localStorage.getItem as Mock).mockReturnValue(mockToken);

    const token = useGetJWT();

    expect(token).toBe(mockToken);
    expect(localStorage.getItem).toHaveBeenCalledWith(gameVerseToken);
  });
});
