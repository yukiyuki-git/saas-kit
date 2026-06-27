import { describe, it, expect } from "vitest";

describe("SaaS Kit Feature Flags", () => {
  it("dark_mode is enabled by default", async () => {
    const { isEnabled } = await import("@/lib/feature-flags");
    expect(isEnabled("dark_mode")).toBe(true);
  });

  it("two_factor_auth is enabled by default", async () => {
    const { isEnabled } = await import("@/lib/feature-flags");
    expect(isEnabled("two_factor_auth")).toBe(true);
  });

  it("team_invitations is enabled by default", async () => {
    const { isEnabled } = await import("@/lib/feature-flags");
    expect(isEnabled("team_invitations")).toBe(true);
  });

  it("api_keys is enabled by default", async () => {
    const { isEnabled } = await import("@/lib/feature-flags");
    expect(isEnabled("api_keys")).toBe(true);
  });

  it("file_uploads is disabled by default", async () => {
    const { isEnabled } = await import("@/lib/feature-flags");
    expect(isEnabled("file_uploads")).toBe(false);
  });

  it("beta_features is disabled by default", async () => {
    const { isEnabled } = await import("@/lib/feature-flags");
    expect(isEnabled("beta_features")).toBe(false);
  });

  it("getAllFlags returns all flags", async () => {
    const { getAllFlags } = await import("@/lib/feature-flags");
    const flags = getAllFlags();
    expect(Object.keys(flags).length).toBeGreaterThan(10);
    expect(flags).toHaveProperty("dark_mode");
    expect(flags).toHaveProperty("two_factor_auth");
    expect(flags).toHaveProperty("api_keys");
    expect(flags).toHaveProperty("beta_features");
  });

  it("enabledFlags returns only enabled", async () => {
    const { enabledFlags, isEnabled } = await import("@/lib/feature-flags");
    const flags = enabledFlags();
    for (const flag of flags) {
      expect(isEnabled(flag)).toBe(true);
    }
    expect(flags).not.toContain("beta_features");
    expect(flags).not.toContain("file_uploads");
  });
});
