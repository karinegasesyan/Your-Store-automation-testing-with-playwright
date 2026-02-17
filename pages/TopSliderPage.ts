import { expect, Page } from "@playwright/test";

export class TopSlider {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectSliderVisible() {
    await expect(this.page.locator(".swiper-viewport").first()).toBeVisible();
  }
  async clickNextWithCheck() {
    if (
      await this.page.getByRole("link", { name: "iPhone" }).nth(1).isVisible()
    ) {
      await this.page.locator(".swiper-button-next").first().click();
      await expect(
        this.page.getByRole("img", { name: "MacBookAir" }).nth(1),
      ).toBeVisible();
    } else {
      await this.page.locator(".swiper-button-next").first().click();
      await expect(
        this.page.getByRole("link", { name: "iPhone" }).nth(1),
      ).toBeVisible();
    }
  }
  async clickPrevWithCheck() {
    if (
      await this.page
        .getByRole("link", { name: "MacBookAir" })
        .nth(1)
        .isVisible()
    ) {
      await this.page.locator(".swiper-button-prev").first().click();
      await expect(
        this.page.getByRole("link", { name: "iPhone" }).nth(1),
      ).toBeVisible();
    } else {
      await this.page.locator(".swiper-button-prev").first().click();
      await expect(
        this.page.getByRole("img", { name: "MacBookAir" }).nth(1),
      ).toBeVisible();
    }
  }
  async clickDotAndCheck() {
    const slider = this.page.locator(".swiper-viewport").first();
    const dots = this.page.locator(".swiper-pagination-bullet");
    await dots.nth(0).click();
    await expect(dots.nth(0)).toHaveClass(/swiper-pagination-bullet-active/);
    await expect(
      slider.getByRole("link", { name: /iPhone/i }).first(),
    ).toBeVisible();
    await dots.nth(1).click();
    await expect(dots.nth(1)).toHaveClass(/swiper-pagination-bullet-active/);
    await expect(
      this.page.getByRole("img", { name: "MacBookAir" }).nth(1),
    ).toBeVisible();
  }
  async testFirstSliderImage() {
    await this.page.getByRole("link", { name: "iPhone" }).first().click();
    await expect(this.page).toHaveTitle("Samsung Galaxy Tab 10.1");
    await expect(this.page).toHaveURL(
      "https://tutorialsninja.com/demo/index.php?route=product/product&path=57&product_id=49",
    );
    await expect(
      this.page.getByRole("link", { name: "Samsung Galaxy Tab" }).nth(1),
    ).toBeVisible();
    await expect(
      this.page.getByRole("heading", { name: "Samsung Galaxy Tab" }),
    ).toBeVisible();
    await expect(this.page.getByText("Product Code:SAM1")).toBeVisible();
    await expect(this.page.getByText("Reward Points:")).toBeVisible();
    await expect(this.page.getByText("Availability:Pre-Order")).toBeVisible();
    await expect(this.page.getByText("Ex Tax:$")).toBeVisible();
    await expect(this.page.getByText("Qty")).toBeVisible();
    await expect(this.page.getByRole("textbox", { name: "Qty" })).toBeVisible();
    await this.page.getByRole("button", { name: "Add to Cart" }).click();
    await expect(this.page.getByText("Success: You have added")).toBeVisible();
  }
}
