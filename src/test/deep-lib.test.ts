import { describe, it, expect } from "vitest";

describe("SaaS Kit Lib Module Deep Tests", () => {
  it("cn handles complex class merging", async () => {
    const { cn } = await import("@/lib/utils");
    const result = cn("px-4 py-2", "px-8");
    expect(result).toContain("px-8");
    expect(result).toContain("py-2");
    expect(result).not.toContain("px-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar");
  });

  it("slugify handles edge cases", async () => {
    const { slugify } = await import("@/lib/utils");
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("---test---")).toBe("test");
    expect(slugify("a")).toBe("a");
    expect(slugify("123")).toBe("123");
  });

  it("formatDate handles various dates", async () => {
    const { formatDate } = await import("@/lib/utils");
    expect(formatDate("2024-01-01")).toContain("January");
    expect(formatDate("2024-12-31")).toContain("December");
    expect(formatDate(new Date("2024-06-15"))).toContain("June");
  });

  it("truncate handles edge cases", async () => {
    const { truncate } = await import("@/lib/utils");
    expect(truncate("", 5)).toBe("");
    expect(truncate("abc", 5)).toBe("abc");
    expect(truncate("abcde", 5)).toBe("abcde");
    expect(truncate("abcdef", 5)).toBe("abcde...");
  });

  it("hasPermission boundary cases", async () => {
    const { hasPermission } = await import("@/lib/rbac");
    // Same level
    expect(hasPermission("owner", "owner")).toBe(true);
    expect(hasPermission("admin", "admin")).toBe(true);
    expect(hasPermission("member", "member")).toBe(true);
  });

  it("generateApiKey produces unique results", async () => {
    const { generateApiKey } = await import("@/lib/api-key");
    const keys = Array.from({ length: 50 }, () => generateApiKey());
    const uniqueKeys = new Set(keys.map((k) => k.key));
    expect(uniqueKeys.size).toBe(50);
    const uniqueHashes = new Set(keys.map((k) => k.hash));
    expect(uniqueHashes.size).toBe(50);
  });
});
