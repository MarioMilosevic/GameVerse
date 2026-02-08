import { describe, it, expect, vi, beforeEach } from "vitest";
import { createReview, deleteReview, editReview } from "./index";
import { ReviewType, GameReviewType } from "@/utils/types";

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe("reviews API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createReview", () => {
    it("creates a review successfully", async () => {
      const mockReview: ReviewType = {
        content: "This is a comment",
        user: {
          fullName: "Mario Milosevic",
          role: "ADMIN",
          email: "mario@gmail.com",
          createdDate: "01-01-2025",
          active: true,
          image: "image-example.jpg",
        },
        rating: 8,
        gameId: 1,
        userId: 1,
      };
      const mockResponse = { id: 1, ...mockReview };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await createReview(mockReview);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/reviews"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mockReview),
        }),
      );
      expect(result).toEqual(mockResponse);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await createReview({
        content: "Test",
        rating: 5,
        userId: 1,
        user: {
          fullName: "Test User",
          role: "USER",
          email: "test@test.com",
          createdDate: "01-01-2025",
          active: true,
          image: "",
        },
      });

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("deleteReview", () => {
    it("deletes a review successfully", async () => {
      const mockResponse = { message: "Review deleted" };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await deleteReview(1);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/reviews/1"),
        expect.objectContaining({
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }),
      );
      expect(result).toEqual(mockResponse);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await deleteReview(999);

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("editReview", () => {
    it("edits a review successfully", async () => {
      const updatedReview: GameReviewType = {
        content: "Updated comment",
        rating: 9,
      };
      const mockResponse = { id: 1, ...updatedReview };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await editReview(1, updatedReview);

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/reviews/1"),
        expect.objectContaining({
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updatedReview }),
        }),
      );
      expect(result).toEqual(mockResponse);
    });

    it("handles errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await editReview(999, { content: "Test", rating: 5 });

      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });
});
