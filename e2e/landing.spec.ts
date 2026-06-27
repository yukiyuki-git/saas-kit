import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("has correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/SaaS Kit/);
  });

  test("displays hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Build Your SaaS")).toBeVisible();
    await expect(page.getByText("in Days, Not Months")).toBeVisible();
  });

  test("has CTA buttons", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Get Started Free" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View Documentation" })).toBeVisible();
  });

  test("displays features section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Everything You Need")).toBeVisible();
    await expect(page.getByText("Authentication")).toBeVisible();
    await expect(page.getByText("Billing & Subscriptions")).toBeVisible();
    await expect(page.getByText("Team Management")).toBeVisible();
  });

  test("displays testimonials", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Loved by Developers")).toBeVisible();
  });

  test("displays FAQ section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Frequently Asked Questions")).toBeVisible();
  });

  test("navigates to pricing page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Pricing" }).first().click();
    await expect(page).toHaveURL(/pricing/);
  });

  test("navigates to register page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Get Started Free" }).first().click();
    await expect(page).toHaveURL(/register/);
  });
});
