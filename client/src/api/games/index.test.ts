import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllGames, getSingleGame } from "./index";

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe("games API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllGames", () => {
    it("fetches all games successfully", async () => {
      const mockGames = [
        { id: 1, name: "Game 1" },
        { id: 2, name: "Game 2" },
      ];
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockGames),
      });

      const result = await getAllGames();

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/games"));
      expect(result).toEqual(mockGames);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await getAllGames();

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("getSingleGame", () => {
    it("fetches a single game by id", async () => {
      const mockGame = { id: 1, name: "Game 1" };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockGame),
      });

      const result = await getSingleGame(1);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/games/1"));
      expect(result).toEqual(mockGame);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await getSingleGame(999);

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });
});
