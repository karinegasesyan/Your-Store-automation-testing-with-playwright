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
    await this.page.locator(".swiper-button-next").first().click();
    await expect(
      this.page
        .locator(".swiper-viewport")
        .first()
        .getByRole("img", { name: /MacBookAir/i })
        .first(),
    ).toBeVisible();
  }

  async clickPrevWithCheck() {
    await this.page.locator(".swiper-button-prev").first().click();
    await expect(
      this.page
        .locator(".swiper-viewport")
        .first()
        .getByRole("link", { name: /iPhone/i })
        .first(),
    ).toBeVisible();
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
      slider.getByRole("img", { name: /MacBookAir/i }).first(),
    ).toBeVisible();
  }

  async testFirstSliderImage() {
    await this.page
      .getByRole("link", { name: /iPhone/i })
      .first()
      .click();

    await expect(this.page).toHaveTitle(/Samsung Galaxy Tab/);
    await expect(this.page).toHaveURL(/product_id=49/);

    await expect(
      this.page.getByRole("link", { name: /Samsung Galaxy Tab/i }).nth(1),
    ).toBeVisible();

    await expect(
      this.page.getByRole("heading", { name: /Samsung Galaxy Tab/i }),
    ).toBeVisible();

    await expect(this.page.getByText("Product Code:SAM1")).toBeVisible();
    await expect(this.page.getByText("Reward Points:")).toBeVisible();
    await expect(this.page.getByText("Availability:Pre-Order")).toBeVisible();
    await expect(this.page.getByText("Ex Tax:$")).toBeVisible();
    await expect(this.page.getByText("Qty")).toBeVisible();

    await expect(this.page.getByRole("textbox", { name: "Qty" })).toBeVisible();

    await this.page.getByRole("button", { name: /Add to Cart/i }).click();

    await expect(this.page.getByText(/Success: You have added/i)).toBeVisible();
  }
}
