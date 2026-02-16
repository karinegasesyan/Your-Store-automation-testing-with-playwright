import { expect, Page } from "@playwright/test";

export class TopSlider {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectVisible() {
    await expect(this.page.locator(".swiper-viewport").first()).toBeVisible();
  }

  async clickNext() {
    await this.page.locator(".swiper-button-next").first().click();
  }

  async clickPrev() {
    await this.page.locator(".swiper-button-prev").first().click();
  }

  async clickDot(index: number) {
    await this.page.locator(".swiper-pagination-bullet").nth(index).click();
  }

  async expectSlide(role: "link" | "img", name: string) {
    await expect(this.page.getByRole(role, { name }).nth(1)).toBeVisible();
  }

  async clickProduct(name: string) {
    await this.page.getByRole("link", { name }).first().click();
  }
  async verifySamsungGalaxyTabPage() {
    await expect(this.page).toHaveTitle("Samsung Galaxy Tab 10.1");
    await expect(this.page).toHaveURL(/product_id=49/);

    await expect(
      this.page.getByRole("heading", { name: "Samsung Galaxy Tab" }),
    ).toBeVisible();

    await this.page.getByRole("button", { name: "Add to Cart" }).click();

    await expect(this.page.getByText("Success: You have added")).toBeVisible();
  }
}
