import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://tutorialsninja.com/demo/index.php?route=common/home"
  );
});

test.describe("Bottom slider – indicators (dots)", () => {
  test("should display the bottom slider", async ({ page }) => {
    await expect(page.locator(".swiper-viewport").first()).toBeVisible();
  });

  test("should activate correct slide when specific indicators are clicked", async ({
    page,
  }) => {
    //Indicator 1
    await page
      .locator(
        ".swiper-pagination.carousel0 > .swiper-pagination-bullet.swiper-pagination-bullet-active"
      )
      .click();
    await expect(page.locator("div:nth-child(6)")).toContainClass(
      "swiper-slide-active"
    );

    //Indicator 4
    await page.locator("span:nth-child(4)").click();
    await expect(page.locator("div:nth-child(9)")).toContainClass(
      "swiper-slide-active"
    );

    //Indicator 7
    await page.locator("span:nth-child(7)").click();
    await expect(page.locator("div:nth-child(12)")).toContainClass(
      "swiper-slide-active"
    );

    //Indicator 11
    await page.locator("span:nth-child(11)").click();
    await expect(page.locator("div:nth-child(16)")).toContainClass(
      "swiper-slide-active"
    );
  });

  test("should activate each slide when looping through all indicators", async ({
    page,
  }) => {
    const indicators = page.locator(".swiper-pagination-bullet");
    const count = 11;
    for (let i = 0; i < count; i++) {
      await indicators.nth(i).click();
      await expect(indicators.nth(i)).toContainClass(
        "swiper-pagination-bullet-active"
      );
    }
  });

  test("should apply active style to the selected indicator", async ({
    page,
  }) => {
    await page.locator("span:nth-child(6)").click();
    await expect(page.locator("span:nth-child(6)")).toContainClass(
      "swiper-pagination-bullet swiper-pagination-bullet-active"
    );
  });
});
