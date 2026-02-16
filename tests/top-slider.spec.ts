import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://tutorialsninja.com/demo/index.php?route=common/home"
  );
});

test.describe("Testing top slider", () => {
  test("Test if slider is visible", async ({ page }) => {
    await expect(page.locator(".swiper-viewport").first()).toBeVisible();
  });

  test("Test slider Next button functionality", async ({ page }) => {
    if (await page.getByRole("link", { name: "iPhone" }).nth(1).isVisible()) {
      await page.locator(".swiper-button-next").first().click();
      await expect(
        page.getByRole("img", { name: "MacBookAir" }).nth(1)
      ).toBeVisible();
    } else {
      await page.locator(".swiper-button-next").first().click();
      await expect(
        page.getByRole("link", { name: "iPhone" }).nth(1)
      ).toBeVisible();
    }
  });

  test("Test slider Previous button functionality", async ({ page }) => {
    if (
      await page.getByRole("link", { name: "MacBookAir" }).nth(1).isVisible()
    ) {
      await page.locator(".swiper-button-prev").first().click();
      await expect(
        page.getByRole("link", { name: "iPhone" }).nth(1)
      ).toBeVisible();
    } else {
      await page.locator(".swiper-button-prev").first().click();
      await expect(
        page.getByRole("img", { name: "MacBookAir" }).nth(1)
      ).toBeVisible();
    }
  });

  test("Test slider indicators/dots", async ({ page }) => {
    const slider = page.locator(".swiper-viewport").first();
    const dots = page.locator(".swiper-pagination-bullet");

    await dots.nth(0).click();
    await expect(dots.nth(0)).toHaveClass(/swiper-pagination-bullet-active/);
    await expect(
      slider.getByRole("link", { name: /iPhone/i }).first()
    ).toBeVisible();

    await dots.nth(1).click();
    await expect(dots.nth(1)).toHaveClass(/swiper-pagination-bullet-active/);
    await expect(
      page.getByRole("img", { name: "MacBookAir" }).nth(1)
    ).toBeVisible();
  });
  test("Test first slider image link", async ({ page }) => {
    await page.getByRole("link", { name: "iPhone" }).first().click();
    await expect(page).toHaveTitle("Samsung Galaxy Tab 10.1");
    await expect(page).toHaveURL(
      "https://tutorialsninja.com/demo/index.php?route=product/product&path=57&product_id=49"
    );
    await expect(
      page.getByRole("link", { name: "Samsung Galaxy Tab" }).nth(1)
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Samsung Galaxy Tab" })
    ).toBeVisible();
    await expect(page.getByText("Product Code:SAM1")).toBeVisible();
    await expect(page.getByText("Reward Points:")).toBeVisible();
    await expect(page.getByText("Availability:Pre-Order")).toBeVisible();
    await expect(page.getByText("Ex Tax:$")).toBeVisible();
    await expect(page.getByText("Qty")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Qty" })).toBeVisible();
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await expect(page.getByText("Success: You have added")).toBeVisible();
  });
});
