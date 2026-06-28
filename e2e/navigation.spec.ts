import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("navbar displays logo and links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /SaaS Kit/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Pricing" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Docs" }).first()).toBeVisible();
  });

  test("navbar has sign in and get started buttons", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Sign In" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Get Started" }).first()).toBeVisible();
  });

  test("clicking logo goes to home", async ({ page }) => {
    await page.goto("/pricing");
    await page.getByRole("link", { name: /SaaS Kit/i }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("sign in navigates to login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Sign In" }).first().click();
    await expect(page).toHaveURL(/login/);
  });

  test("footer has links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Documentation" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Terms of Service" })).toBeVisible();
  });
});

test.describe("Features Page", () => {
  test("renders feature sections", async ({ page }) => {
    await page.goto("/features");
    await expect(page.getByText("Features")).toBeVisible();
  });

  test("lists all major features", async ({ page }) => {
    await page.goto("/features");
    await expect(page.getByText("Authentication")).toBeVisible();
    await expect(page.getByText("Billing")).toBeVisible();
  });
});

test.describe("FAQ Page", () => {
  test("renders FAQ section", async ({ page }) => {
    await page.goto("/faq");
    await expect(page.getByText("Frequently Asked Questions")).toBeVisible();
  });

  test("has accordion items", async ({ page }) => {
    await page.goto("/faq");
    const questions = page.locator("[data-slot=accordion-trigger]");
    const count = await questions.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Tech Stack Page", () => {
  test("renders tech stack information", async ({ page }) => {
    await page.goto("/tech-stack");
    await expect(page.getByText("Tech Stack")).toBeVisible();
  });
});

test.describe("API Docs Page", () => {
  test("renders API documentation", async ({ page }) => {
    await page.goto("/api-docs");
    await expect(page.getByText("API")).toBeVisible();
  });
});

test.describe("Sitemap Page", () => {
  test("renders sitemap", async ({ page }) => {
    await page.goto("/sitemap-page");
    await expect(page.getByText("Sitemap")).toBeVisible();
  });
});

test.describe("SEO", () => {
  test("homepage has meta description", async ({ page }) => {
    await page.goto("/");
    const meta = page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute("content", /.+/);
  });

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
  });

  test("sitemap.xml is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
  });
});

test.describe("Health Check", () => {
  test("health endpoint responds", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.status()).toBe(200);
  });
});

test.describe("Responsive Design", () => {
  test("mobile viewport shows content", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(page.getByText("Build Your SaaS")).toBeVisible();
  });

  test("tablet viewport shows content", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await expect(page.getByText("Build Your SaaS")).toBeVisible();
  });
});
