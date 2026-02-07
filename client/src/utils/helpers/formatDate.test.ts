import { expect, it, describe } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats a valid ISO date string", () => {
    const result = formatDate("2024-01-05");
    expect(result).toBe("05 January 2024");
  });

  it("formats a full ISO datetime string", () => {
    const result = formatDate("2023-12-25T10:30:00Z");
    expect(result).toBe("25 December 2023");
  });

  it("pads single-digit days with leading zero", () => {
    const result = formatDate("2024-02-03");
    expect(result.startsWith("03")).toBe(true);
  });

  it("returns a string in 'dd MMMM yyyy' format", () => {
    const result = formatDate("2022-11-15");
    expect(result).toMatch(/^\d{2} [A-Za-z]+ \d{4}$/);
  });

  it("produces an Invalid Date result for invalid input", () => {
    const result = formatDate("not-a-date");
    expect(result).toBe("Invalid Date");
  });
});
