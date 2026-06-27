import { describe, it, expect } from "vitest";
import { cn, slugify, formatDate, truncate } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("deduplicates classes", () => {
    expect(cn("px-4 px-8")).toBe("px-8");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra");
  });

  it("handles undefined and null", () => {
    expect(cn("base", undefined, null)).toBe("base");
  });

  it("merges tailwind classes correctly", () => {
    const result = cn("bg-red-500", "bg-blue-500");
    expect(result).toBe("bg-blue-500");
  });

  it("handles empty input", () => {
    expect(cn()).toBe("");
  });

  it("handles arrays", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });
});

describe("slugify", () => {
  it("converts to lowercase", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("my team name")).toBe("my-team-name");
  });

  it("removes special characters", () => {
    expect(slugify("Hello! @World#")).toBe("hello-world");
  });

  it("handles multiple spaces", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });

  it("trims leading/trailing hyphens", () => {
    expect(slugify("--hello--")).toBe("hello");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("handles numbers", () => {
    expect(slugify("team-123")).toBe("team-123");
  });

  it("handles unicode", () => {
    expect(slugify("café résumé")).toMatch(/caf.*r.*sum/);
  });
});

describe("formatDate", () => {
  it("formats a date object", () => {
    const date = new Date("2024-01-15");
    const result = formatDate(date);
    expect(result).toContain("January");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });

  it("formats a date string", () => {
    const result = formatDate("2024-06-15");
    expect(result).toContain("June");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });
});

describe("truncate", () => {
  it("returns original string if shorter than limit", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates long strings", () => {
    expect(truncate("hello world", 5)).toBe("hello...");
  });

  it("returns original string if exactly at limit", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });

  it("handles empty string", () => {
    expect(truncate("", 5)).toBe("");
  });
});
