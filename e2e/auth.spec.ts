import { test, expect } from "@playwright/test";

test.describe("Auth Pages", () => {
  test("login page renders correctly", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("Welcome back")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("login page has OAuth buttons", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: "GitHub" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Google" })).toBeVisible();
  });

  test("login page has link to register", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: "Sign up" }).click();
    await expect(page).toHaveURL(/register/);
  });

  test("login page has link to forgot password", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: "Forgot password?" }).click();
    await expect(page).toHaveURL(/forgot-password/);
  });

  test("register page renders correctly", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByText("Create an account")).toBeVisible();
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Create Account" })).toBeVisible();
  });

  test("register page has link to login", async ({ page }) => {
    await page.goto("/register");
    await page.getByRole("link", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/login/);
  });

  test("forgot password page renders correctly", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.getByText("Forgot password?")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send Reset Link" })).toBeVisible();
  });
});
