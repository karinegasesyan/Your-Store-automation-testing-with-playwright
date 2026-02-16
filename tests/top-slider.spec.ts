import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { TopSlider } from "../pages/TopSliderPage";

let basePage: BasePage;
let topSlider: TopSlider;

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page);
  topSlider = new TopSlider(page);
  await basePage.open();
});

test.describe.only("Testing top slider", () => {
  const navigation = [
    {
      action: () => topSlider.clickNext(),
      role: "img" as const,
      name: "MacBookAir",
    },
    {
      action: () => topSlider.clickPrev(),
      role: "link" as const,
      name: "iPhone",
    },
  ];

  const slides = [
    { index: 0, role: "link" as const, name: "iPhone" },
    { index: 1, role: "img" as const, name: "MacBookAir" },
  ];

  test("Test if slider is visible", async ({ page }) => {
    await topSlider.expectVisible();
  });

  for (let i = 0; i < navigation.length; i++) {
    const nav = navigation[i];
    test(`Slider navigation test ${i + 1}`, async () => {
      await nav.action();
      await topSlider.expectSlide(nav.role, nav.name);
    });
  }

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];

    test(`Test slider indicators/dots ${i + 1} works`, async () => {
      await topSlider.clickDot(slide.index);
      await topSlider.expectSlide(slide.role, slide.name);
    });
  }

  test("Test first slider image link", async ({ page }) => {
    await topSlider.clickProduct("iPhone");
    await topSlider.verifySamsungGalaxyTabPage();
  });
});
