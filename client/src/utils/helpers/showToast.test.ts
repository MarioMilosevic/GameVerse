import { describe, it, expect, vi, beforeEach } from "vitest";
import { showToast } from "./showToast";
import { toast } from "vue3-toastify";

vi.mock("vue3-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    POSITION: {
      TOP_CENTER: "top-center",
    },
  },
}));

describe("showToast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows success toast by default", () => {
    showToast("Success message");

    expect(toast.success).toHaveBeenCalledOnce();
    expect(toast.success).toHaveBeenCalledWith("Success message", {
      position: "top-center",
    });
  });

  it("shows success toast when type is explicitly 'success'", () => {
    showToast("All good", "success");

    expect(toast.success).toHaveBeenCalledWith("All good", {
      position: "top-center",
    });
  });

  it("shows error toast when type is 'error'", () => {
    showToast("Something went wrong", "error");

    expect(toast.error).toHaveBeenCalledOnce();
    expect(toast.error).toHaveBeenCalledWith("Something went wrong", {
      position: "top-center",
    });
  });

  it("does not call the other toast type", () => {
    showToast("Oops", "error");

    expect(toast.error).toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });
});
