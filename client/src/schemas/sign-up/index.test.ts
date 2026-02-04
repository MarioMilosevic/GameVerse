import { signUpSchema } from ".";
import { describe, it, expect } from "vitest";
import { ZodError } from "zod";

describe("sign up schema", () => {
  it("passes with valid data", () => {
    expect(() =>
      signUpSchema.parse({
        fullName: "John Smith",
        email: "john@example.com",
        password: "password123",
        passwordConfirm: "password123",
      }),
    ).not.toThrow();
  });

  it("passes when full name has extra spaces", () => {
    expect(() =>
      signUpSchema.parse({
        fullName: "  John   Smith  ",
        email: "john@example.com",
        password: "password123",
        passwordConfirm: "password123",
      }),
    ).not.toThrow();
  });
  it("fails when value is null", () => {
    expect(() => signUpSchema.parse(null)).toThrow();
  });

  it("fails when value is not an object", () => {
    expect(() => signUpSchema.parse("test")).toThrow();
  });

  it("fails when fullName is missing", () => {
    expect(() =>
      signUpSchema.parse({
        email: "john@example.com",
        password: "password123",
        passwordConfirm: "password123",
      }),
    ).toThrow();
  });

  it("fails when email is missing", () => {
    expect(() =>
      signUpSchema.parse({
        fullName: "John Smith",
        password: "password123",
        passwordConfirm: "password123",
      }),
    ).toThrow();
  });

  it("fails when password is missing", () => {
    expect(() =>
      signUpSchema.parse({
        fullName: "John Smith",
        email: "john@example.com",
        passwordConfirm: "password123",
      }),
    ).toThrow();
  });

  it("fails when passwordConfirm is missing", () => {
    expect(() =>
      signUpSchema.parse({
        fullName: "John Smith",
        email: "john@example.com",
        password: "password123",
      }),
    ).toThrow();
  });

  it("fails when fullName is shorter than 5 characters", () => {
    expect(() =>
      signUpSchema.parse({
        fullName: "Joe",
        email: "joe@example.com",
        password: "password123",
        passwordConfirm: "password123",
      }),
    ).toThrow("Must be at least 5 character(s)");
  });

  it("fails when only first name is provided", () => {
    expect(() =>
      signUpSchema.parse({
        fullName: "John",
        email: "john@example.com",
        password: "password123",
        passwordConfirm: "password123",
      }),
    ).toThrow("Last name must have at least 2 characters");
  });

  it("fails when last name is one character long", () => {
    expect(() =>
      signUpSchema.parse({
        fullName: "John S",
        email: "john@example.com",
        password: "password123",
        passwordConfirm: "password123",
      }),
    ).toThrow("Last name must have at least 2 characters");
  });

  it("fails when email is invalid", () => {
    expect(() =>
      signUpSchema.parse({
        fullName: "John Smith",
        email: "not-an-email",
        password: "password123",
        passwordConfirm: "password123",
      }),
    ).toThrow();
  });

  it("fails when password is shorter than 8 characters", () => {
    const passwordMessage = {
      message: "Password must be at least 8 characters",
    };
    expect(() =>
      signUpSchema.parse({
        fullName: "John Smith",
        email: "john@example.com",
        password: "short",
        passwordConfirm: "password123",
      }),
    ).toThrow(passwordMessage.message);
  });

  it("fails when passwordConfirm is shorter than 8 characters", () => {
    const passwordMessage = {
      message: "Password must be at least 8 characters",
    };
    expect(() =>
      signUpSchema.parse({
        fullName: "John Smith",
        email: "john@example.com",
        password: "password123",
        passwordConfirm: "short",
      }),
    ).toThrow(passwordMessage.message);
  });

  it("passes when both passwords are exactly 8 characters", () => {
    expect(() =>
      signUpSchema.parse({
        fullName: "John Smith",
        email: "john@example.com",
        password: "12345678",
        passwordConfirm: "12345678",
      }),
    ).not.toThrow();
  });
  it("fails when password and passwordConfirm do not match", () => {
    try {
      signUpSchema.parse({
        fullName: "John Smith",
        email: "john@example.com",
        password: "password123",
        passwordConfirm: "different123",
      });

      // If parse does NOT throw, force test to fail
      throw new Error("Expected validation error");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);

      const zodError = error as ZodError;

      expect(zodError.issues[0].message).toBe("Passwords do not match");
      expect(zodError.issues[0].path).toEqual(["passwordConfirm"]);
    }
  });
});
