import { expect, Locator, Page } from "@playwright/test";

export class CurrencyPage {
  readonly page: Page;
  readonly currencyDropdown: Locator;
  readonly euroOption: Locator;
  readonly poundOption: Locator;
  readonly dollarOption: Locator;
  readonly headerCurrencyButton: Locator;
  readonly cartButton: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.currencyDropdown = page.getByRole("button", { name: /currency/i });
    this.euroOption = page.getByRole("button", { name: "€Euro" });
    this.poundOption = page.getByRole("button", { name: "£Pound Sterling" });
    this.dollarOption = page.getByRole("button", { name: "$US Dollar" });
    this.headerCurrencyButton = page.locator(
      '//*[@id="form-currency"]/div/button',
    );
    this.cartButton = page.locator('//*[@id="cart"]/button');
    this.productPrices = page.locator(".caption .price");
  }

  async openDropdown() {
    await this.currencyDropdown.click();
  }

  async expectAllCurrencyOptionsVisible() {
    await expect(this.euroOption).toBeVisible();
    await expect(this.poundOption).toBeVisible();
    await expect(this.dollarOption).toBeVisible();
  }

  async selectEuro() {
    await this.page.getByRole("button", { name: "€Euro" }).click();
  }

  async selectPound() {
    await this.page.getByRole("button", { name: "£Pound Sterling" }).click();
  }

  async selectDollar() {
    await this.page.getByRole("button", { name: "$US Dollar" }).click();
  }

  async expectAllOptionsVisible() {
    await expect(
      this.page.getByRole("button", { name: "€Euro" }),
    ).toBeVisible();

    await expect(
      this.page.getByRole("button", { name: "£Pound Sterling" }),
    ).toBeVisible();

    await expect(
      this.page.getByRole("button", { name: "$US Dollar" }),
    ).toBeVisible();
  }

  async expectSelectedCurrency(symbol: "€" | "£" | "$") {
    await expect(
      this.page.getByRole("button", {
        name: new RegExp(`\\${symbol}\\s*currency`, "i"),
      }),
    ).toBeVisible();
  }

  async selectCurrency(option: "€Euro" | "£Pound Sterling" | "$US Dollar") {
    await this.page.getByRole("button", { name: option }).click();
  }

  async expectCartHasSymbol(symbol: string) {
    await expect(
      this.page.getByRole("button", {
        name: new RegExp(`item\\(s\\).*\\${symbol}`),
      }),
    ).toBeVisible();
  }

  featuredPriceBlock(index: number): Locator {
    return this.page.locator(
      `//*[@id="content"]/div[2]/div[${index}]/div/div[2]/p[2]`,
    );
  }

  async expectFeaturedVisible(index: number) {
    await expect(this.featuredPriceBlock(index)).toBeVisible();
  }

  async expectFeaturedContains(index: number, text: RegExp) {
    await expect(this.featuredPriceBlock(index)).toContainText(text);
  }

  async expectTextVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async expectNthTextVisible(text: string, nth: number) {
    await expect(this.page.getByText(text).nth(nth)).toBeVisible();
  }
  async selectCurrencyByName(name: string) {
    await this.page.getByRole("button", { name }).click();
  }
  async expectHeaderCurrencySymbol(symbol: string) {
    await expect(this.headerCurrencyButton).toContainText(symbol);
  }

  async expectCartCurrencySymbol(symbol: string) {
    await expect(this.cartButton).toContainText(symbol);
  }

  async expectAllPricesHaveSymbol(symbol: string) {
    const count = await this.productPrices.count();

    for (let i = 0; i < count; i++) {
      await expect(this.productPrices.nth(i)).toContainText(symbol);
    }
  }
}
