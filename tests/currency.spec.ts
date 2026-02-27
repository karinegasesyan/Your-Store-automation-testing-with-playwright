import { test } from "@playwright/test";
import { CurrencyPage } from "../pages/CurrencyPage";
import { BasePage } from "../pages/BasePage";

let basePage: BasePage;
let currencyPage: CurrencyPage;

test.beforeEach(async ({ page }) => {
  currencyPage = new CurrencyPage(page);
  basePage = new BasePage(page);
  await basePage.open();
});
test.describe("Currency dropdown functionality @currency", () => {
  test("should allow the user to change currency from the dropdown", async ({
    page,
  }) => {
    const currencyPage = new CurrencyPage(page);

    // Open dropdown & verify options
    await currencyPage.openDropdown();

    // Verify all currency options are visible
    await currencyPage.expectAllCurrencyOptionsVisible();

    // Select Euro
    await currencyPage.selectEuro();
    await currencyPage.expectSelectedCurrency("€");

    // Select Pound Sterling
    await currencyPage.openDropdown();
    await currencyPage.selectPound();
    await currencyPage.expectSelectedCurrency("£");

    // Select US Dollar
    await currencyPage.openDropdown();
    await currencyPage.selectDollar();
    await currencyPage.expectSelectedCurrency("$");
  });

  test("should update featured items prices when the currency is changed", async ({
    page,
  }) => {
    // Options: USD | EUR | GBP
    const selectedCurrency = "EUR";
    const currencyPage = new CurrencyPage(page);

    // Open the currency dropdown
    await currencyPage.openDropdown();

    // -------- EUR --------
    if (selectedCurrency === "EUR") {
      await currencyPage.selectCurrency("€Euro");

      await currencyPage.expectFeaturedVisible(1);
      await currencyPage.expectFeaturedContains(1, /392\.30€/);

      await currencyPage.expectFeaturedVisible(2);
      await currencyPage.expectFeaturedContains(2, /Ex Tax:\s*79\.24\s*€/);

      await currencyPage.expectTextVisible("86.31€");
      await currencyPage.expectNthTextVisible("95.72€", 1);
      await currencyPage.expectFeaturedContains(3, /Ex Tax:\s*70\.61€/);

      await currencyPage.expectTextVisible("76.89€");
      await currencyPage.expectFeaturedContains(4, /Ex Tax:\s*62\.77€/);

      await currencyPage.expectCartHasSymbol("€");

      // -------- GBP --------
    } else if (selectedCurrency === "GBP") {
      await currencyPage.selectCurrency("£Pound Sterling");

      await currencyPage.expectFeaturedContains(1, /392\.30£/);
      await currencyPage.expectFeaturedContains(2, /Ex Tax:\s*79\.24£/);

      await currencyPage.expectTextVisible("86.31£");
      await currencyPage.expectTextVisible("95.72£");
      await currencyPage.expectFeaturedContains(3, /Ex Tax:\s*70\.61£/);

      await currencyPage.expectTextVisible("76.89£");
      await currencyPage.expectFeaturedContains(4, /Ex Tax:\s*62\.77£/);

      await currencyPage.expectCartHasSymbol("£");

      // -------- USD --------
    } else {
      await currencyPage.selectCurrency("$US Dollar");

      await currencyPage.expectFeaturedContains(1, /\$392\.30/);
      await currencyPage.expectFeaturedContains(2, /Ex Tax:\s*\$79\.24/);

      await currencyPage.expectTextVisible("$86.31");
      await currencyPage.expectTextVisible("$95.72");
      await currencyPage.expectFeaturedContains(3, /Ex Tax:\s*\$70\.61/);

      await currencyPage.expectTextVisible("$76.89");
      await currencyPage.expectFeaturedContains(4, /Ex Tax:\s*\$62\.77/);

      await currencyPage.expectCartHasSymbol("$");
    }
  });
});

test.describe("Verify currency symbol is updated after currency change", () => {
  const currencies = [
    { currency: "US Dollar", symbol: "$" },
    { currency: "Euro", symbol: "€" },
    { currency: "Pound Sterling", symbol: "£" },
  ];

  for (let obj of currencies) {
    test(`should update currency symbol when currency is changed ${obj.symbol}`, async ({
      page,
    }) => {
      const currencyPage = new CurrencyPage(page);
      await currencyPage.openDropdown();
      await currencyPage.selectCurrencyByName(obj.currency);

      await currencyPage.expectHeaderCurrencySymbol(obj.symbol);
      await currencyPage.expectCartCurrencySymbol(obj.symbol);
      await currencyPage.expectAllPricesHaveSymbol(obj.symbol);
    });
  }
});
