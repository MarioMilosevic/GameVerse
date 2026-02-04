import { gameReviewSchema } from ".";
import { describe, expect, it } from "vitest";

describe("game review schema", () => {
  it("passes with valid rating and content", () => {
    const data = { rating: 5, content: "Great game" };
    expect(() => gameReviewSchema.parse(data)).not.toThrow();
  });
  it("passes when content is exactly 2 characters", () => {
    const data = { rating: 3, content: "OK" };
    expect(() => gameReviewSchema.parse(data)).not.toThrow();
  });

  it("fails when value is null", () => {
    expect(() => gameReviewSchema.parse(null)).toThrow();
  });

  it("fails when value is undefined", () => {
    expect(() => gameReviewSchema.parse(undefined)).toThrow();
  });

  it("fails when value is not an object", () => {
    expect(() => gameReviewSchema.parse("test")).toThrow();
  });

  it("fails when rating is missing", () => {
    expect(() => gameReviewSchema.parse({ content: "Nice" })).toThrow();
  });

  it("fails when content is missing", () => {
    expect(() => gameReviewSchema.parse({ rating: 4 })).toThrow();
  });

  it("fails when content is not a string", () => {
    expect(() => gameReviewSchema.parse({ rating: 4, content: 123 })).toThrow();
  });

  it("fails when content is empty", () => {
    expect(() => gameReviewSchema.parse({ rating: 4, content: "" })).toThrow();
  });

  it("fails when content is 1 character long", () => {
    expect(() => gameReviewSchema.parse({ rating: 4, content: "A" })).toThrow();
  });

  it("passes with extra fields (Zod allows them by default)", () => {
    const data = {
      rating: 5,
      content: "Great",
      extra: "ignored",
    };
    expect(() => gameReviewSchema.parse(data)).not.toThrow();
  });
});
