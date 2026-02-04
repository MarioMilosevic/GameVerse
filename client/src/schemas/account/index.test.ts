import { expect, describe, it } from "vitest";
import { accountSchema } from ".";

describe("account schema", () => {
  describe("fullName", () => {
    it("fails if less than 5 characters", () => {
      const user = { fullName: "John", email: "john@it.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some((i) => i.message === "Must be at least 5 character(s)")).toBe(true);
    });

    it("fails if last name is missing", () => {
      const user = { fullName: "Mario", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some((i) => i.message === "Last name must have at least 2 characters")).toBe(true);
    });

    it("fails if last name is less than 2 characters", () => {
      const user = { fullName: "Mario M", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some((i) => i.message === "Last name must have at least 2 characters")).toBe(true);
    });

    it("passes with valid full name", () => {
      const user = { fullName: "Mario Milosevic", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it("passes with extra spaces or multiple words", () => {
      const user = { fullName: "  Mario   Milosevic  ", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it("passes with middle name", () => {
      const user = { fullName: "Mario John Milosevic", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(true);
    });
  });

  describe("email", () => {
    it("fails if email is invalid", () => {
      const user = { fullName: "Mario Milosevic", email: "email" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it("fails if email is empty", () => {
      const user = { fullName: "Mario Milosevic", email: "" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
    });

    it("passes with valid email", () => {
      const user = { fullName: "Mario Milosevic", email: "mario@example.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it("passes with complex valid emails", () => {
      const user1 = { fullName: "Mario Milosevic", email: "mario+test@example.com" };
      const user2 = { fullName: "Mario Milosevic", email: "mario.smith@example.co.uk" };
      expect(accountSchema.safeParse(user1).success).toBe(true);
      expect(accountSchema.safeParse(user2).success).toBe(true);
    });
  });

  describe("combined object tests", () => {
    it("fails if both fullName and email are invalid", () => {
      const user = { fullName: "Jo M", email: "notanemail" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some((i) => i.message === "Must be at least 5 character(s)")).toBe(true);
      expect(result.error?.issues.some((i) => i.message === "Last name must have at least 2 characters")).toBe(true);
    });

    it("passes if both fullName and email are valid", () => {
      const user = { fullName: "Mario Milosevic", email: "mario@gmail.com" };
      const result = accountSchema.safeParse(user);
      expect(result.success).toBe(true);
    });
  });
});
