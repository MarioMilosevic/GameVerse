import { describe, it, expect } from "vitest";
import { fillStars } from "./fillStars";

describe("fillStars", () => {
  it("returns an array with default length (10)", () => {
    const result = fillStars(0);
    expect(result).toHaveLength(10);
  });

  it("fills stars up to the given index (inclusive)", () => {
    const result = fillStars(2, 5);
    expect(result).toEqual(["fill", "fill", "fill", "empty", "empty"]);
  });

  it("returns all empty stars when index is -1", () => {
    const result = fillStars(-1, 5);
    expect(result).toEqual(["empty", "empty", "empty", "empty", "empty"]);
  });

  it("returns all filled stars when index is greater than length", () => {
    const result = fillStars(10, 5);
    expect(result).toEqual(["fill", "fill", "fill", "fill", "fill"]);
  });

  it("handles length of 0", () => {
    const result = fillStars(2, 0);
    expect(result).toEqual([]);
  });

  it("contains only 'fill' or 'empty' values", () => {
    const result = fillStars(3, 5);
    result.forEach((value) => {
      expect(["fill", "empty"]).toContain(value);
    });
  });
});
