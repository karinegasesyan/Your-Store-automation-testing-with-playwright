import { test } from "@playwright/test";
import { MenuPage } from "../pages/MenuPage";
import { BasePage } from "../pages/BasePage";

//--------------------------------
//   TEST DATA (ALL CONSTS HERE)
//--------------------------------

const NAVIGATION_TEST_DATA = {
  desktops: {
    suiteName: "Desktops test",
    items: [
      {
        testName: "Test for PC",
        nav: "Desktops",
        subNav: "PC (0)",
        heading: "PC",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=20_26",
        title: "PC",
      },
      {
        testName: "Test for Mac",
        nav: "Desktops",
        subNav: "Mac (1)",
        heading: "Mac",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=20_27",
        title: "Mac",
      },
      {
        testName: "Show all Desktops tests",
        nav: "Desktops",
        subNav: "Show AllDesktops",
        heading: "Desktops",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=20",
        title: "Desktops",
      },
    ],
  },

  laptops: {
    suiteName: "Laptops & Notebooks test",
    items: [
      {
        testName: "Test for Macs",
        nav: "Laptops & Notebooks",
        subNav: "Macs (0)",
        heading: "Macs",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=18_46",
        title: "Macs",
      },
      {
        testName: "Test for Windows",
        nav: "Laptops & Notebooks",
        subNav: "Windows (0)",
        heading: "Windows",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=18_45",
        title: "Windows",
      },
      {
        testName: "Test for all Laptops & Notebooks",
        nav: "Laptops & Notebooks",
        subNav: "Show AllLaptops & Notebooks",
        heading: "Laptops & Notebooks",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=18",
        title: "Laptops & Notebooks",
      },
    ],
  },

  components: {
    suiteName: "Components test",
    items: [
      {
        testName: "Testing Mice and Trackballs",
        nav: "Components",
        subNav: "Mice and Trackballs",
        heading: "Mice and Trackballs",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=25_29",
        title: "Mice and Trackballs",
      },
      {
        testName: "Testing Monitors",
        nav: "Components",
        subNav: "Monitors (2)",
        heading: "Monitors",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=25_28",
        title: "Monitors",
      },
      {
        testName: "Testing Printers",
        nav: "Components",
        subNav: "Printers (0)",
        heading: "Printers",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=25_30",
        title: "Printers",
      },
      {
        testName: "Testing Scanners",
        nav: "Components",
        subNav: "Scanners (0)",
        heading: "Scanners",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=25_31",
        title: "Scanners",
      },
      {
        testName: "Testing Web Cameras",
        nav: "Components",
        subNav: "Web Cameras (0)",
        heading: "Web Cameras",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=25_32",
        title: "Web Cameras",
      },
      {
        testName: "Testing all Components",
        nav: "Components",
        subNav: "Show AllComponents",
        heading: "Components",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=25",
        title: "Components",
      },
    ],
  },

  tablets: {
    suiteName: "Tablets test",
    items: [
      {
        testName: "Tablets testing",
        nav: "Tablets",
        subNav: "Tablets",
        heading: "Tablets",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=57",
        title: "Tablets",
      },
    ],
  },

  software: {
    suiteName: "Software test",
    items: [
      {
        testName: "Software testing",
        nav: "Software",
        subNav: "Software",
        heading: "Software",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=17",
        title: "Software",
      },
    ],
  },

  phonesPDAs: {
    suiteName: "Phones & PDAs test",
    items: [
      {
        testName: "Phones & PDAs testing",
        nav: "Phones & PDAs",
        subNav: "Phones & PDAs",
        heading: "Phones & PDAs",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=24",
        title: "Phones & PDAs",
      },
    ],
  },

  cameras: {
    suiteName: "Cameras test",
    items: [
      {
        testName: "Cameras testing",
        nav: "Cameras",
        subNav: "Cameras",
        heading: "Cameras",
        url: "https://tutorialsninja.com/demo/index.php?route=product/category&path=33",
        title: "Cameras",
      },
    ],
  },
} as const;

let menuPage: MenuPage;
let basePage: BasePage;

test.beforeEach(async ({ page }) => {
  menuPage = new MenuPage(page);
  basePage = new BasePage(page);
  await basePage.open();
});

test.skip(
  ({ browserName }) => browserName === "webkit",
  "Skipping webkit tests",
);

// Desktops
test.describe(NAVIGATION_TEST_DATA.desktops.suiteName, () => {
  for (const item of NAVIGATION_TEST_DATA.desktops.items) {
    test(item.testName, async () => {
      await menuPage.clickSubMenu(item.nav, item.subNav);

      await menuPage.checkCurrentPageHeading(item.heading);

      await menuPage.checkCurrentPage(item.url, item.title);
    });
  }
});

// Laptops
test.describe(NAVIGATION_TEST_DATA.laptops.suiteName, () => {
  for (const item of NAVIGATION_TEST_DATA.laptops.items) {
    test(item.testName, async () => {
      await menuPage.clickSubMenu(item.nav, item.subNav);

      await menuPage.checkCurrentPageHeading(item.heading);

      await menuPage.checkCurrentPage(item.url, item.title);
    });
  }
});

//Components
test.describe(NAVIGATION_TEST_DATA.components.suiteName, () => {
  for (const item of NAVIGATION_TEST_DATA.components.items) {
    test(item.testName, async () => {
      await menuPage.clickSubMenu(item.nav, item.subNav);

      await menuPage.checkCurrentPageHeading(item.heading);

      await menuPage.checkCurrentPage(item.url, item.title);
    });
  }
});

// Tablets
test.describe(NAVIGATION_TEST_DATA.tablets.suiteName, () => {
  for (const item of NAVIGATION_TEST_DATA.tablets.items) {
    test(item.testName, async () => {
      await menuPage.clickSubMenu(item.nav, item.subNav);

      await menuPage.checkCurrentPageHeading(item.heading);

      await menuPage.checkCurrentPage(item.url, item.title);
    });
  }
});

// Software
test.describe(NAVIGATION_TEST_DATA.software.suiteName, () => {
  for (const item of NAVIGATION_TEST_DATA.software.items) {
    test(item.testName, async () => {
      await menuPage.clickSubMenu(item.nav, item.subNav);

      await menuPage.checkCurrentPageHeading(item.heading);

      await menuPage.checkCurrentPage(item.url, item.title);
    });
  }
});

// Phones & PDAs
test.describe(NAVIGATION_TEST_DATA.phonesPDAs.suiteName, () => {
  for (const item of NAVIGATION_TEST_DATA.phonesPDAs.items) {
    test(item.testName, async () => {
      await menuPage.clickSubMenu(item.nav, item.subNav);

      await menuPage.checkCurrentPageHeading(item.heading);

      await menuPage.checkCurrentPage(item.url, item.title);
    });
  }
});

// Cameras
test.describe(NAVIGATION_TEST_DATA.cameras.suiteName, () => {
  for (const item of NAVIGATION_TEST_DATA.cameras.items) {
    test(item.testName, async () => {
      await menuPage.clickSubMenu(item.nav, item.subNav);

      await menuPage.checkCurrentPageHeading(item.heading);

      await menuPage.checkCurrentPage(item.url, item.title);
    });
  }
});
