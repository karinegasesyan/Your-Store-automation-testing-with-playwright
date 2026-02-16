import { expect, Page } from "@playwright/test";

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async searchForProduct(term: string) {
    await this.page.getByRole("textbox", { name: "Search" }).click();
    await this.page.getByRole("textbox", { name: "Search" }).fill(term);
    await this.page.locator("#search").getByRole("button").click();
  }
  async verifyTitleAndURL(term: string) {
    if (term) {
      await expect(this.page).toHaveTitle(`Search - ${term}`);
      await expect(this.page).toHaveURL(
        `https://tutorialsninja.com/demo/index.php?route=product/search&search=${term}`,
      );
    } else {
      await expect(this.page).toHaveTitle("Search");
      await expect(this.page).toHaveURL(/route=product\/search/);
    }
  }

  async verifyHeadings(term: string) {
    await expect(
      this.page.getByRole("heading", { name: `Search - ${term}` }),
    ).toBeVisible();

    await expect(
      this.page.getByRole("heading", {
        name: "Products meeting the search",
      }),
    ).toBeVisible();
  }

  async verifyProductsContain(term: string) {
    const products = await this.page.locator(".caption h4").allTextContents();

    for (const product of products) {
      expect(product.toLowerCase()).toContain(term.toLowerCase());
    }
  }

  async verifyNoResultsMessage() {
    await expect(
      this.page.getByText(
        "There is no product that matches the search criteria.",
      ),
    ).toBeVisible();
  }
}
