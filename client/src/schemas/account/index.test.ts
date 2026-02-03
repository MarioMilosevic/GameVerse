import { expect, describe, test } from "vitest";
import { accountSchema } from ".";

describe("account schema", () => {
  describe("fullName", () => {
    test("fails if less than 5 characters", () => {
      const user = { fullName: "John", email: "john@test.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some((i) => i.message === "Must be at least 5 character(s)")).toBe(true);
    });

    test("fails if last name is missing", () => {
      const user = { fullName: "Mario", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some((i) => i.message === "Last name must have at least 2 characters")).toBe(true);
    });

    test("fails if last name is less than 2 characters", () => {
      const user = { fullName: "Mario M", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some((i) => i.message === "Last name must have at least 2 characters")).toBe(true);
    });

    test("passes with valid full name", () => {
      const user = { fullName: "Mario Milosevic", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    test("passes with extra spaces or multiple words", () => {
      const user = { fullName: "  Mario   Milosevic  ", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    test("passes with middle name", () => {
      const user = { fullName: "Mario John Milosevic", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(true);
    });
  });

  describe("email", () => {
    test("fails if email is invalid", () => {
      const user = { fullName: "Mario Milosevic", email: "email" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    test("fails if email is empty", () => {
      const user = { fullName: "Mario Milosevic", email: "" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    test("passes with valid email", () => {
      const user = { fullName: "Mario Milosevic", email: "mario@example.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    test("passes with complex valid emails", () => {
      const user1 = { fullName: "Mario Milosevic", email: "mario+test@example.com" };
      const user2 = { fullName: "Mario Milosevic", email: "mario.smith@example.co.uk" };
      expect(accountSchema.safeParse(user1).success).toBe(true);
      expect(accountSchema.safeParse(user2).success).toBe(true);
    });
  });

  describe("combined object tests", () => {
    test("fails if both fullName and email are invalid", () => {
      const user = { fullName: "Jo M", email: "notanemail" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some((i) => i.message === "Must be at least 5 character(s)")).toBe(true);
      expect(result.error?.issues.some((i) => i.message === "Last name must have at least 2 characters")).toBe(true);
    });

    test("passes if both fullName and email are valid", () => {
      const user = { fullName: "Mario Milosevic", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(true);
    });
  });
});
