import { describe, it, expect } from "vitest";
import { translateElement } from "./translateElement";

describe("function translate element", () => {
  it("translates element by 100", () => {
    const calculation = translateElement(2, 1);
    expect(calculation).toBe("translateX(100%)");
  });
  it("returns 0% when index equals selectedIndex", () => {
    expect(translateElement(1, 1)).toBe("translateX(0%)");
  });
  it("translates element to the left when index is smaller than selectedIndex", () => {
    expect(translateElement(0, 1)).toBe("translateX(-100%)");
  });
  it("translates element multiple steps to the right", () => {
    expect(translateElement(3, 1)).toBe("translateX(200%)");
  });
  it("translates element multiple steps to the left", () => {
    expect(translateElement(0, 3)).toBe("translateX(-300%)");
  });
  it("handles negative indices correctly", () => {
    expect(translateElement(-1, 1)).toBe("translateX(-200%)");
  });
});
