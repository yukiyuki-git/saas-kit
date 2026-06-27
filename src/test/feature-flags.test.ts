import { describe, it, expect } from "vitest";
import { isEnabled, getAllFlags, enabledFlags } from "@/lib/feature-flags";

describe("Feature Flags", () => {
  it("dark_mode is enabled by default", () => {
    expect(isEnabled("dark_mode")).toBe(true);
  });

  it("two_factor_auth is enabled by default", () => {
    expect(isEnabled("two_factor_auth")).toBe(true);
  });

  it("file_uploads is disabled by default", () => {
    expect(isEnabled("file_uploads")).toBe(false);
  });

  it("beta_features is disabled by default", () => {
    expect(isEnabled("beta_features")).toBe(false);
  });

  it("getAllFlags returns all flags", () => {
    const flags = getAllFlags();
    expect(Object.keys(flags).length).toBeGreaterThan(10);
    expect(flags).toHaveProperty("dark_mode");
    expect(flags).toHaveProperty("two_factor_auth");
    expect(flags).toHaveProperty("api_keys");
    expect(flags).toHaveProperty("beta_features");
  });

  it("enabledFlags returns only enabled flags", () => {
    const flags = enabledFlags();
    expect(flags).toContain("dark_mode");
    expect(flags).toContain("two_factor_auth");
    expect(flags).not.toContain("beta_features");
    expect(flags).not.toContain("file_uploads");
  });

  it("all enabled flags are boolean true", () => {
    const flags = enabledFlags();
    for (const flag of flags) {
      expect(isEnabled(flag)).toBe(true);
    }
  });
});
