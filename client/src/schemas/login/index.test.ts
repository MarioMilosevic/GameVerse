import { describe, expect, it } from "vitest";
import { loginSchema } from ".";

describe("login schema", () => {
  it("passes with valid email and password", () => {
    const data = {
      email: "user@example.com",
      password: "password123",
    };

    expect(() => loginSchema.parse(data)).not.toThrow();
  });

  it("fails when value is null", () => {
    expect(() => loginSchema.parse(null)).toThrow();
  });

  it("fails when value is undefined", () => {
    expect(() => loginSchema.parse(undefined)).toThrow();
  });

  it("fails when value is not an object", () => {
    expect(() => loginSchema.parse("test")).toThrow();
  });

  it("fails when email is missing", () => {
    expect(() => loginSchema.parse({ password: "password123" })).toThrow();
  });

  it("fails when password is missing", () => {
    expect(() => loginSchema.parse({ email: "user@example.com" })).toThrow();
  });

  it("fails when email is not a string", () => {
    expect(() => loginSchema.parse({ email: 123, password: "password123" })).toThrow();
  });

  it("fails when email is not a valid email", () => {
    expect(() => loginSchema.parse({ email: "not-an-email", password: "password123" })).toThrow();
  });

  it("fails when password is not a string", () => {
    expect(() => loginSchema.parse({ email: "user@example.com", password: 12345678 })).toThrow();
  });

  it("fails when password is shorter than 8 characters", () => {
    const passwordMessage = {
      message: "Password must be at least 8 characters",
    };
    expect(() => loginSchema.parse({ email: "user@example.com", password: "short" })).toThrow(passwordMessage.message);
  });
  it("passes when password is exactly 8 characters", () => {
    expect(() =>
      loginSchema.parse({
        email: "user@example.com",
        password: "12345678",
      }),
    ).not.toThrow();
  });
});
