import { test } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { LoginPageSec } from "../pages/LoginPageSec";

let basePage: BasePage;
let loginPageSec: LoginPageSec;

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page);
  loginPageSec = new LoginPageSec(page);

  await basePage.open();
  await loginPageSec.gotoLoginPage();
  await loginPageSec.expectLoginPageUrlAndTitle();
});

test.skip(
  ({ browserName }) => browserName === "webkit",
  "Skipping wibkit in Windows",
);

test.describe("Login ", () => {
  test("Login with valid email and valid password", async ({ page }) => {
    await loginPageSec.login("karinegasesyan@gmail.com", "Mila2015");

    await loginPageSec.expectAccountPage();

    await loginPageSec.logout();

    await loginPageSec.expectLogout();

    await page.getByRole("link", { name: "Continue" }).click();

    await basePage.expectHomePage();
  });

  test("Session persists after page refresh", async ({ page }) => {
    await loginPageSec.login("karinegasesyan@gmail.com", "Mila2015");

    // Assert login success BEFORE refresh
    await loginPageSec.expectAccountPage();

    // Refresh the page
    await page.reload();

    // Assert session is still active AFTER refresh
    await loginPageSec.expectAccountPage();
  });

  const negativeTerms = [
    {
      name: "Valid email and invalid password",
      email: "karinegasesyan@gmail.com",
      password: "assqw",
    },
    {
      name: "Invalid email and valid password",
      email: "karinegas@gmail.com",
      password: "aqws122",
    },
    {
      name: "Invalid email and invalid password",
      email: "karinegas@gmail.com",
      password: "asaqwd1234",
    },
    { name: "Empty email and empty password", email: "", password: "" },
    {
      name: "Empty email and filled password",
      email: "",
      password: "assq123",
    },
    {
      name: "Filled email and empty password",
      email: "karinegas@gmail.com",
      password: "",
    },
    {
      name: "Invalid email format",
      email: "karinegasesyan.gmail.com",
      password: "asd123",
    },
    {
      name: "Email with leading and trailing spaces",
      email: "   karinegas@gmail.com  ",
      password: "asd123",
    },
  ];

  for (let term of negativeTerms) {
    test(term.name, async ({ page }) => {
      await loginPageSec.login(term.email, term.password);
      await loginPageSec.expectAlertErrorMessage();
    });
  }
});
