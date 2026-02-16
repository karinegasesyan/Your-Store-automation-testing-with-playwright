import { expect, Page } from "@playwright/test";
import { BASE_LOGIN_URL, BASE_URL } from "./utilities/constraints";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto(BASE_URL);
    await expect(this.page).toHaveURL(
      "https://tutorialsninja.com/demo/index.php?route=common/home",
    );
    await expect(this.page).toHaveTitle("Your Store");
  }

  async openLogin() {
    await this.page.goto(BASE_LOGIN_URL);
    await expect(this.page).toHaveURL(
      "https://tutorialsninja.com/demo/index.php?route=account/login",
    );
    await expect(this.page).toHaveTitle("Account Login");
  }
}
