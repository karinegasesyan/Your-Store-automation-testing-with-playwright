import { test, expect } from "@playwright/test";
import { TopSlider } from "../pages/TopSliderPage";
import { BasePage } from "../pages/BasePage";

let basePage: BasePage;
let topSlider: TopSlider;

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page);
  topSlider = new TopSlider(page);
  await basePage.open();
});

test.describe("Testing top slider", () => {
  test("Test if slider is visible", async ({ page }) => {
    await topSlider.expectSliderVisible();
  });

  test("Test slider Next button functionality", async ({ page }) => {
    await topSlider.clickNextWithCheck();
  });

  test("Test slider Previous button functionality", async ({ page }) => {
    await topSlider.clickPrevWithCheck();
  });

  test("Test slider indicators/dots", async ({ page }) => {
    await topSlider.clickDotAndCheck();
  });

  test("Test first slider image link", async ({ page }) => {
    await topSlider.testFirstSliderImage();
  });
});
