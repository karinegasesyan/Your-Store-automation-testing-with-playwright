import { test, expect } from "@playwright/test";
import { MenuPage } from "../pages/MenuPage";
import { BasePage } from "../pages/BasePage";

let menuPage: MenuPage;
let basePage: BasePage;

test.beforeEach(async ({ page }) => {
  menuPage = new MenuPage(page);
  basePage = new BasePage(page);

  await basePage.open();
});

test.skip(
  ({ browserName }) => browserName == "webkit",
  "Skipping webkit tests",
);

test.describe("Desktops test @nav", () => {
  test("Test for PC", async ({ page }) => {
    await menuPage.clickSubMenu("Desktops", "PC (0)");

    await menuPage.checkCurrentPageHeading("PC");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=20_26",
      "PC",
    );

    await menuPage.checkEmptyProduct("There are no products to list");

    await menuPage.clickContinueButton();
  });

  test("Test for Mac", async ({ page }) => {
    await menuPage.clickSubMenu("Desktops", "Mac (1)");

    await menuPage.checkCurrentPageHeading("Mac");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=20_27",
      "Mac",
    );
  });
  test("Show all Desktops tests", async ({ page }) => {
    await menuPage.clickSubMenu("Desktops", "Show AllDesktops");

    await menuPage.checkCurrentPageHeading("Desktops");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=20",
      "Desktops",
    );
  });
});

test.describe("Laptops & Notebooks", () => {
  test("test for Macs", async ({ page }) => {
    await menuPage.clickSubMenu("Laptops & Notebooks", "Macs (0)");

    await menuPage.checkCurrentPageHeading("Macs");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=18_46",
      "Macs",
    );
    await menuPage.checkEmptyProduct("There are no products to list");

    await menuPage.clickContinueButton();

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=common/home",
      "Your Store",
    );
  });

  test("test for Windows", async ({ page }) => {
    await menuPage.clickSubMenu("Laptops & Notebooks", "Windows (0)");

    await menuPage.checkCurrentPageHeading("Windows");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=18_45",
      "Windows",
    );
    await menuPage.checkEmptyProduct("There are no products to list");

    await menuPage.clickContinueButton();

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=common/home",
      "Your Store",
    );
  });

  test("test for  all Laptops & Notebooks", async ({ page }) => {
    await menuPage.clickSubMenu(
      "Laptops & Notebooks",
      "Show AllLaptops & Notebooks",
    );

    await menuPage.checkCurrentPageHeading("Laptops & Notebooks");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=18",
      "Laptops & Notebooks",
    );
    await expect(page.getByText("Shop Laptop feature only the")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Refine Search" }),
    ).toBeVisible();
  });
});

test.describe("test for Components", () => {
  test("testing Mice and Trackballs", async ({ page }) => {
    await menuPage.clickSubMenu("Components", "Mice and Trackballs (0)");

    await menuPage.checkCurrentPageHeading("Mice and Trackballs");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=25_29",
      "Mice and Trackballs",
    );
    await menuPage.checkEmptyProduct("There are no products to list");

    await menuPage.clickContinueButton();

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=common/home",
      "Your Store",
    );
  });

  test("testing Monitors", async ({ page }) => {
    await menuPage.clickSubMenu("Components", "Monitors (2)");

    await menuPage.checkCurrentPageHeading("Monitors");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=25_28",
      "Monitors",
    );
    await expect(
      page.getByRole("heading", { name: "Refine Search" }),
    ).toBeVisible();
  });

  test("testing Printers", async ({ page }) => {
    await menuPage.clickSubMenu("Components", "Printers (0)");

    await menuPage.checkCurrentPageHeading("Printers");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=25_30",
      "Printers",
    );

    await menuPage.checkEmptyProduct("There are no products to list");

    await menuPage.clickContinueButton();

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=common/home",
      "Your Store",
    );
  });
  test("testing Scanners", async ({ page }) => {
    await menuPage.clickSubMenu("Components", "Scanners (0)");

    await menuPage.checkCurrentPageHeading("Scanners");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=25_31",
      "Scanners",
    );

    await menuPage.checkEmptyProduct("There are no products to list");

    await menuPage.clickContinueButton();

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=common/home",
      "Your Store",
    );
  });
  test("testing Web Cameras", async ({ page }) => {
    await menuPage.clickSubMenu("Components", "Web Cameras (0)");

    await menuPage.checkCurrentPageHeading("Web Cameras");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=25_32",
      "Web Cameras",
    );

    await menuPage.checkEmptyProduct(
      "There are no products to list in this category.",
    );

    await menuPage.clickContinueButton();

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=common/home",
      "Your Store",
    );
  });
  test("testing all Components", async ({ page }) => {
    await menuPage.clickSubMenu("Components", "Show AllComponents");

    await menuPage.checkCurrentPageHeading("Components");

    await menuPage.checkCurrentPage(
      "https://tutorialsninja.com/demo/index.php?route=product/category&path=25",
      "Components",
    );
    await expect(page.getByText("Refine Search")).toBeVisible();
  });
});

test("testing Tablets", async ({ page }) => {
  await menuPage.clickSubMenu("Tablets", "Tablets");

  await menuPage.checkCurrentPageHeading("Tablets");

  await menuPage.checkCurrentPage(
    "https://tutorialsninja.com/demo/index.php?route=product/category&path=57",
    "Tablets",
  );
});

test("testing Software", async ({ page }) => {
  await menuPage.clickSubMenu("Software", "Software");

  await menuPage.checkCurrentPageHeading("Software");

  await menuPage.checkCurrentPage(
    "https://tutorialsninja.com/demo/index.php?route=product/category&path=17",
    "Software",
  );

  await menuPage.checkEmptyProduct("There are no products to list");

  await menuPage.clickContinueButton();

  await menuPage.checkCurrentPage(
    "https://tutorialsninja.com/demo/index.php?route=common/home",
    "Your Store",
  );
});

test("testing Phones & PDAs", async ({ page }) => {
  await menuPage.clickSubMenu("Phones & PDAs", "Phones & PDAs");

  await menuPage.checkCurrentPageHeading("Phones & PDAs");

  await menuPage.checkCurrentPage(
    "https://tutorialsninja.com/demo/index.php?route=product/category&path=24",
    "Phones & PDAs",
  );
});

test("testing Cameras", async ({ page }) => {
  await menuPage.clickSubMenu("Cameras", "Cameras");

  await menuPage.checkCurrentPageHeading("Cameras");

  await menuPage.checkCurrentPage(
    "https://tutorialsninja.com/demo/index.php?route=product/category&path=33",
    "Cameras",
  );
});
