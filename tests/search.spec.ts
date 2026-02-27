import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { BasePage } from "../pages/BasePage";

let searchPage: SearchPage;
let basePage: BasePage;

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page);
  basePage = new BasePage(page);
  await basePage.open();
});

test.skip(
  ({ browserName }) => browserName == "webkit",
  "Skipping webkit tests",
);

test.describe("Search modul for all products @search", () => {
  const searchItems = ["Mac", "iPhone"];

  for (const term of searchItems) {
    test(`Search items for ${term}`, async ({ page }) => {
      await searchPage.searchForProduct(term);

      await searchPage.verifyTitleAndURL(term);

      await searchPage.verifyHeadings(term);

      await searchPage.verifyProductsContain(term);
    });
  }
});

test.describe("Search module - Negative cases", () => {
  const invalidSearchTerms = ["123456", "abcdef", ""];

  for (const term of invalidSearchTerms) {
    test(`Should show no results for "${term || "empty input"}"`, async ({
      page,
    }) => {
      await searchPage.searchForProduct(term);

      await searchPage.verifyTitleAndURL(term);

      await searchPage.verifyNoResultsMessage();
    });
  }
});
