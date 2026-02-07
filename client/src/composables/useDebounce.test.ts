import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "@/composables/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls callback only once after delay", () => {
    const callback = vi.fn();
    const { handleSearch } = useDebounce(callback, 500);
    handleSearch("hello");
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("hello");
  });

  it("debounces multiple rapid calls and uses the last value", () => {
    const callback = vi.fn();
    const { handleSearch } = useDebounce(callback, 500);

    handleSearch("h");
    vi.advanceTimersByTime(200);

    handleSearch("he");
    vi.advanceTimersByTime(200);

    handleSearch("hello");

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("hello");
  });

  it("does not call callback if delay not completed", () => {
    const callback = vi.fn();
    const { handleSearch } = useDebounce(callback, 500);

    handleSearch("test");
    vi.advanceTimersByTime(499);

    expect(callback).not.toHaveBeenCalled();
  });
});
