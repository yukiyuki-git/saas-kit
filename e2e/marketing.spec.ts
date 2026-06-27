import { test, expect } from "@playwright/test";

test.describe("Pricing Page", () => {
  test("displays all plans", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText("Simple, Transparent Pricing")).toBeVisible();
    await expect(page.getByText("Free")).toBeVisible();
    await expect(page.getByText("Pro")).toBeVisible();
    await expect(page.getByText("Enterprise")).toBeVisible();
  });

  test("displays plan prices", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText("$0")).toBeVisible();
    await expect(page.getByText("$29")).toBeVisible();
    await expect(page.getByText("$99")).toBeVisible();
  });

  test("has monthly/yearly toggle", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText("Monthly")).toBeVisible();
    await expect(page.getByText("Yearly")).toBeVisible();
  });

  test("has CTA buttons for each plan", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("link", { name: "Get Started" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Free Trial" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact Sales" })).toBeVisible();
  });
});

test.describe("Marketing Pages", () => {
  test("blog page renders", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByText("Blog")).toBeVisible();
  });

  test("docs page renders", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.getByText("Documentation")).toBeVisible();
    await expect(page.getByText("Getting Started")).toBeVisible();
  });

  test("about page renders", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("About SaaS Kit")).toBeVisible();
  });

  test("contact page renders", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText("Get in Touch")).toBeVisible();
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
  });

  test("changelog page renders", async ({ page }) => {
    await page.goto("/changelog");
    await expect(page.getByText("Changelog")).toBeVisible();
  });

  test("privacy page renders", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByText("Privacy Policy")).toBeVisible();
  });

  test("terms page renders", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByText("Terms of Service")).toBeVisible();
  });
});

test.describe("404 Page", () => {
  test("shows 404 for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Page Not Found")).toBeVisible();
    await expect(page.getByRole("link", { name: "Go Home" })).toBeVisible();
  });
});
