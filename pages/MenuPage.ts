import { expect, Page } from "@playwright/test";

export class MenuPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickSubMenu(menu: string, subMenu: string) {
    await this.page.getByRole("link", { name: menu, exact: true }).hover();
    await this.page.getByRole("link", { name: subMenu }).click();
  }

  async clickContinueButton() {
    await this.page.getByRole("link", { name: "Continue" }).click();
  }

  async checkCurrentPageHeading(heading: string) {
    await expect(
      this.page.getByRole("heading", { name: heading, exact: true }),
    ).toBeVisible();
  }

  async checkCurrentPage(url: string, title: string) {
    await expect(this.page).toHaveURL(url);
    await expect(this.page).toHaveTitle(title);
  }

  async checkEmptyProduct(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
