import { expect, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  // Test data: valid credentials for existing account
  readonly validEmail = "karinegasesyan@gmail.com";
  readonly validPassword = "Mila2015";

  // Expected URLs & Titles
  private readonly accountUrl =
    "https://tutorialsninja.com/demo/index.php?route=account/account";
  private readonly pageTitle = "My Account";

  private readonly logoutUrl =
    "https://tutorialsninja.com/demo/index.php?route=account/logout";
  private readonly logoutTitle = "Account Logout";

  constructor(page: Page) {
    this.page = page;
  }

  async loginWithValidCredentials() {
    await this.page.locator("#input-email").fill(this.validEmail);
    await this.page.locator("#input-password").fill(this.validPassword);
    await this.page.locator("input[value='Login']").click();
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(this.accountUrl);
    await expect(this.page).toHaveTitle(this.pageTitle);
    await expect(this.page.locator("h2:has-text('My Account')")).toBeVisible();
    await expect(
      this.page.locator("#column-right").getByRole("link", { name: "Logout" }),
    ).toBeVisible();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async logout() {
    await this.page.locator("#column-right >> text=Logout").click();
  }

  async verifySuccessfulLogout() {
    await expect(this.page).toHaveURL(this.logoutUrl);
    await expect(this.page).toHaveTitle(this.logoutTitle);
    await expect(this.page.locator('//*[@id="content"]/h1')).toBeVisible();
  }

  async login() {
    await this.page.locator("a:has-text('Login'):visible").click();
  }
  async verifyInvalidLoginError() {
    await this.page.locator("#input-email").fill("wrongemail@test.com");
    await this.page.locator("#input-password").fill("wrongPass");
    await this.page.locator("input[value='Login']").click();
    await expect(this.page.locator(".alert.alert-danger")).toHaveText(
      /Warning: No match for E-Mail Address and\/or Password\./,
    );
  }
  async verifyInvalidPasswordError() {
    await this.page.locator("#input-email").fill(this.validEmail);
    await this.page.locator("#input-password").fill("incorrectPassword");
    await this.page.locator("input[value='Login']").click();
    await expect(this.page.locator(".alert.alert-danger")).toHaveText(
      /Warning: No match for E-Mail Address and\/or Password\./,
    );
  }
  async verifyEmptyFieldsError() {
    // Don’t fill anything, just click login
    await this.page.locator("input[value='Login']").click();
    await expect(this.page.locator(".alert.alert-danger")).toHaveText(
      /Warning: No match for E-Mail Address and\/or Password\./,
    );
  }
}
