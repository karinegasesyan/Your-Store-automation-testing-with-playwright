import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/BasePage";

let loginPage: LoginPage;
let basePage: BasePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  basePage = new BasePage(page);

  await basePage.openLogin();
});

test.describe("Login page test", () => {
  test("should log in successfully with valid credentials / User logs in with valid email + password", async ({
    page,
  }) => {
    // Fill in login form & Submit login form
    await loginPage.loginWithValidCredentials();

    // Verify successful login
    await loginPage.verifySuccessfulLogin();
  });
  test("should keep user logged in after page reload", async ({ page }) => {
    // LOGIN
    await loginPage.loginWithValidCredentials();

    // ASSERT user is logged in
    await loginPage.verifySuccessfulLogin();

    // RELOAD PAGE
    await loginPage.reloadPage();

    // ASSERT user is STILL logged in after reload
    await loginPage.verifySuccessfulLogin();
  });

  test("should allow user to login again after logout", async ({ page }) => {
    // FIRST LOGIN
    await loginPage.loginWithValidCredentials();

    // Verify My Account page is loaded
    await loginPage.verifySuccessfulLogin();

    // LOGOUT

    await loginPage.logout();

    // Verify logout page
    await loginPage.verifySuccessfulLogout();

    // GO BACK TO LOGIN PAGE
    // Click only the visible "Login" link to open login form

    await loginPage.login();

    // LOGIN AGAIN
    await loginPage.loginWithValidCredentials();

    // ASSERTIONS AFTER LOGIN
    await loginPage.verifySuccessfulLogin();
  });

  test("should show an error when credentials are invalid", async ({
    page,
  }) => {
    await loginPage.verifyInvalidLoginError();
  });

  test("should show an error with valid email but invalid password", async ({
    page,
  }) => {
    await loginPage.verifyInvalidPasswordError();
  });

  test("should show an error when fields are empty", async ({ page }) => {
    await loginPage.verifyEmptyFieldsError();
  });
});
