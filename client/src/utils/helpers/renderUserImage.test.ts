import { expect, it, describe, vi } from "vitest";
import { renderUserImage } from "./renderUserImage";

vi.mock("@/shared/constants", () => ({
  baseUrl: "http://localhost:3000/api/v1",
  profileImg: "https://social-network-js.vercel.app/img/profile5.png",
}));

describe("renderUserImage", () => {
  it("returns full public image URL when image starts with 'images'", () => {
    const result = renderUserImage("images/avatar.png");

    expect(result).toBe("http://localhost:3000/public/images/avatar.png");
  });

  it("returns profileImg when image does not start with 'images'", () => {
    const result = renderUserImage("avatar.png");

    expect(result).toBe("https://social-network-js.vercel.app/img/profile5.png");
  });

  it("returns profileImg when image is an empty string", () => {
    const result = renderUserImage("");

    expect(result).toBe("https://social-network-js.vercel.app/img/profile5.png");
  });

  it("returns profileImg when image is an absolute URL", () => {
    const result = renderUserImage("https://example.com/avatar.png");

    expect(result).toBe("https://social-network-js.vercel.app/img/profile5.png");
  });
});
