import { test } from "@playwright/test";
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
  test("Test if slider is visible", async () => {
    await topSlider.expectSliderVisible();
  });

  test("Test slider button functionality", async () => {
    const btnDir = "next";

    if (btnDir === "next") {
      await topSlider.clickNext();
      await topSlider.checkMacBookAirSlide();
    } else {
      await topSlider.clickPrev();
      await topSlider.checkIphoneSlide();
    }
  });

  test("Test slider indicators/dots", async () => {
    await topSlider.clickDotAndCheck();
  });

  test("Test first slider image link", async () => {
    await topSlider.testFirstSliderImage();
  });
});
