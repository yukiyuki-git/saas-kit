import { describe, it, expect } from "vitest";
import { hasPermission, PERMISSIONS } from "@/lib/rbac";

describe("hasPermission", () => {
  it("owner has all permissions", () => {
    expect(hasPermission("owner", "owner")).toBe(true);
    expect(hasPermission("owner", "admin")).toBe(true);
    expect(hasPermission("owner", "member")).toBe(true);
  });

  it("admin has admin and member permissions", () => {
    expect(hasPermission("admin", "owner")).toBe(false);
    expect(hasPermission("admin", "admin")).toBe(true);
    expect(hasPermission("admin", "member")).toBe(true);
  });

  it("member only has member permissions", () => {
    expect(hasPermission("member", "owner")).toBe(false);
    expect(hasPermission("member", "admin")).toBe(false);
    expect(hasPermission("member", "member")).toBe(true);
  });
});

describe("PERMISSIONS", () => {
  it("billing requires owner", () => {
    expect(PERMISSIONS.MANAGE_BILLING).toBe("owner");
    expect(PERMISSIONS.DELETE_TEAM).toBe("owner");
  });

  it("inviting requires admin", () => {
    expect(PERMISSIONS.INVITE_MEMBERS).toBe("admin");
    expect(PERMISSIONS.REMOVE_MEMBERS).toBe("admin");
  });

  it("dashboard requires member", () => {
    expect(PERMISSIONS.VIEW_DASHBOARD).toBe("member");
    expect(PERMISSIONS.USE_FEATURES).toBe("member");
  });
});
