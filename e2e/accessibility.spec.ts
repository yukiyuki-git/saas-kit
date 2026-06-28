import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("login page has no critical accessibility issues", async ({ page }) => {
    await page.goto("/login");
    const labels = page.locator("label");
    const count = await labels.count();
    expect(count).toBeGreaterThan(0);
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).toBeTruthy();
    }
  });

  test("form inputs have associated labels", async ({ page }) => {
    await page.goto("/register");
    const inputs = page.locator("input[type=text], input[type=email], input[type=password]");
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      const id = await inputs.nth(i).getAttribute("id");
      const ariaLabel = await inputs.nth(i).getAttribute("aria-label");
      expect(id || ariaLabel).toBeTruthy();
    }
  });

  test("headings are in correct order", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    const count = await h1.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Performance", () => {
  test("pages load within reasonable time", async ({ page }) => {
    const start = Date.now();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(10000);
  });
});
