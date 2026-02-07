import { describe, it, expect } from "vitest";
import { createVideoUrl } from "./createVideoUrl";

describe("createVideoUrl", () => {
  it("creates a valid YouTube embed URL with autoplay and mute", () => {
    const result = createVideoUrl("abc123");

    expect(result).toBe("https://www.youtube.com/embed/abc123?autoplay=1&mute=1");
  });

  it("includes the provided videoId in the URL", () => {
    const videoId = "my-video-id";
    const result = createVideoUrl(videoId);

    expect(result).toContain(`/embed/${videoId}`);
  });

  it("always includes autoplay and mute query params", () => {
    const result = createVideoUrl("xyz");

    expect(result).toContain("autoplay=1");
    expect(result).toContain("mute=1");
  });

  it("handles empty videoId", () => {
    const result = createVideoUrl("");

    expect(result).toBe("https://www.youtube.com/embed/?autoplay=1&mute=1");
  });
});
