import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://tutorialsninja.com/demo/index.php?route=common/home",
  );

  await page.getByRole("button", { name: " Add to Cart" }).first().click();
  await page.getByRole("button", { name: " Add to Cart" }).first().click();
  await expect(page.getByText("Success: You have added")).toContainText(
    "MacBook",
  );
  await page.getByRole("button", { name: " Add to Cart" }).nth(1).click();
  await expect(page.getByText("Success: You have added")).toContainText(
    "iPhone",
  );

  await expect(
    page.getByRole("button", { name: /3 item\(s\) - \$/ }),
  ).toBeVisible();

  await page.getByRole("button", { name: /3 item\(s\) - \$/ }).click();
  await page.locator("#cart").getByRole("link", { name: " Checkout" }).click();
});

test.describe("Checkout functionality", () => {
  test("should display shopping cart page with correct content", async ({
    page,
  }) => {
    await expect(page).toHaveTitle("Shopping Cart");
    await expect(page).toHaveURL(
      "https://tutorialsninja.com/demo/index.php?route=checkout/cart",
    );
    await expect(page.getByText("Products marked with *** are")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Shopping Cart  (10.00kg)" }),
    ).toBeVisible();
  });

  test("should display checkout table with product details", async ({
    page,
  }) => {
    // Table headers
    await expect(page.getByRole("cell", { name: "Image" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Product Name" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Model" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Quantity" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Unit Price" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Total", exact: true }),
    ).toBeVisible();

    // First product row
    await expect(page.getByRole("cell", { name: "iPhone ***" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "product 11" })).toBeVisible();
    await expect(
      page.getByRole("row", { name: /iPhone \*\*\*/ }).getByRole("textbox"),
    ).toHaveValue("1");
    await expect(page.getByRole("cell", { name: "$" }).first()).toContainText(
      "123.20",
    );
    await expect(page.getByRole("cell", { name: "$" }).nth(1)).toContainText(
      "123.20",
    );

    // Second product row
    await expect(
      page.getByRole("cell", { name: "MacBook *** Reward Points:" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Product 16" })).toBeVisible();
    await expect(
      page.getByRole("row", { name: /MacBook \*\*\*/ }).getByRole("textbox"),
    ).toHaveValue("2");
    await expect(page.getByRole("cell", { name: "$602.00" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "$1,204.00" })).toBeVisible();
  });

  test("should show warning for unavailable products", async ({ page }) => {
    await expect(page.getByText("***").nth(1)).toBeVisible();
    await expect(page.getByText("Products marked with *** are")).toBeVisible();
  });

  test("Verifies product quantity updates in the cart and recalculates totals correctly", async ({
    page,
  }) => {
    // Remove MacBook from Cart
    // Clicking the delete button for MacBook
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(4).click();

    //Step 1: Update iPhone Quantity 1 -> 2
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input')
      .first()
      .click();
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input')
      .first()
      .fill("2");

    // Click the update button to save quantity change
    await page.getByRole("button").nth(4).click();

    // Verify Success Message and Product Totals
    await expect(page.getByText("Success: You have modified")).toBeVisible();

    // Verify unit price for iPhone
    await expect(page.getByRole("cell", { name: "$123.20" })).toBeVisible();

    // Verify total price for 2 iPhones
    await expect(
      page.getByRole("cell", { name: "$246.40" }).nth(1),
    ).toBeVisible();

    // Verify Cart Summary
    await expect(page.getByText("Sub-Total:")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$202.00" })).toBeVisible();

    await expect(page.getByText("Eco Tax (-2.00):")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$4.00" })).toBeVisible();

    await expect(page.getByText("VAT (20%):")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$40.40" })).toBeVisible();

    await expect(page.getByText("Total:", { exact: true })).toBeVisible();
    await expect(
      page.locator('//*[@id="content"]/div[2]/div/table/tbody/tr[4]/td[2]'),
    ).toContainText("$246.40");

    //Step 2: Update quantity from 2 -> 3 and verify totals
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input')
      .first()
      .click();
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input')
      .first()
      .fill("3");

    // Click the update button to save quantity change
    await page.getByRole("button").nth(5).click();

    // Verify Success Message and Product Totals
    await expect(page.getByText("Success: You have modified")).toBeVisible();

    // Verify unit price for iPhone
    await expect(page.getByRole("cell", { name: "$123.20" })).toBeVisible();

    // Verify total price for 3 iPhones
    await expect(
      page.getByRole("cell", { name: "$369.60" }).nth(1),
    ).toBeVisible();

    // Verify Cart Summary
    await expect(page.getByText("Sub-Total:")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$303.00" })).toBeVisible();

    await expect(page.getByText("Eco Tax (-2.00):")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$6.00" })).toBeVisible();

    await expect(page.getByText("VAT (20%):")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$60.60" })).toBeVisible();

    await expect(page.getByText("Total:", { exact: true })).toBeVisible();
    await expect(
      page.locator('//*[@id="content"]/div[2]/div/table/tbody/tr[4]/td[2]'),
    ).toContainText("$369.60");

    //Step 3: Update quantity from 3 -> 1 and verify totals
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input')
      .first()
      .click();
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input')
      .first()
      .fill("1");

    // Click the update button to save quantity change
    await page.getByRole("button").nth(5).click();

    // Verify Success Message and Product Totals
    await expect(page.getByText("Success: You have modified")).toBeVisible();

    // Verify unit price for iPhone
    await expect(
      page.getByRole("cell", { name: "$123.20" }).nth(0),
    ).toBeVisible();

    // Verify total price for 3 iPhones
    await expect(
      page.getByRole("cell", { name: "$123.20" }).nth(1),
    ).toBeVisible();

    // Verify Cart Summary
    await expect(page.getByText("Sub-Total:")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$101.00" })).toBeVisible();

    await expect(page.getByText("Eco Tax (-2.00):")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$2.00" })).toBeVisible();

    await expect(page.getByText("VAT (20%):")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$20.20" })).toBeVisible();

    await expect(page.getByText("Total:", { exact: true })).toBeVisible();
    await expect(
      page.locator('//*[@id="content"]/div[2]/div/table/tbody/tr[4]/td[2]'),
    ).toContainText("$123.20");

    //Step 4: Update quantity from 1 -> 0
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input')
      .first()
      .click();
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input')
      .first()
      .fill("0");

    // Click the update button to save quantity change
    await page.getByRole("button").nth(4).click();

    // Verify success message
    await expect(
      page.getByRole("heading", { name: "Shopping Cart" }),
    ).toBeVisible();

    // Now click Continue to go home
    await page.getByRole("link", { name: "Continue" }).click();

    // Verify navigation
    await expect(page).toHaveTitle("Your Store");
    await expect(page).toHaveURL(
      "https://tutorialsninja.com/demo/index.php?route=common/home",
    );
  });
});

test.describe("Verify Multiple Product Quantity Updates in Shopping Cart", () => {
  test("Case 1: Increase the quantity of MacBook from 2 to 3 and verify the updated line total", async ({
    page,
  }) => {
    // Remove iPhone from Cart
    // Clicking the delete button for iPhone
    await page
      .locator(
        '//*[@id="content"]/form/div/table/tbody/tr[1]/td[4]/div/span/button[2]',
      )
      .click();

    //Step 1: Update MacBook Quantity 2 -> 3
    await page
      .locator('//td[a[text()="MacBook"]]/following-sibling::td[2]/div/input')
      .click();

    // Step 1: Fill MacBook quantity input
    await page
      .locator('//td[a[text()="MacBook"]]/following-sibling::td[2]/div/input')
      .fill("3");

    // Click the update button to save quantity change
    await page
      .getByRole("row", { name: /MacBook/ })
      .getByRole("button", { name: "" })
      .click();

    // Verify Success Message and Product Totals
    await expect(page.getByText("Success: You have modified")).toBeVisible();

    // Verify unit price for MacBook
    await expect(
      page
        .getByRole("row", { name: /MacBook/ })
        .getByRole("cell")
        .nth(4),
    ).toHaveText("$602.00");

    // Verify total price for MacBook
    await expect(
      page
        .getByRole("row", { name: /MacBook/ })
        .getByRole("cell")
        .nth(5),
    ).toHaveText("$1,806.00");

    // Verify Cart Summary
    await expect(page.getByRole("cell", { name: "Sub-Total:" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "$1,500.00" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Eco Tax (-2.00):" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "$6.00" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "VAT (20%):" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "$300.00" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Total:", exact: true }),
    ).toBeVisible();
    await expect(
      page.locator('//*[@id="content"]/div[2]/div/table/tbody/tr[4]/td[2]'),
    ).toHaveText("$1,806.00");
  });

  test("Case 2: Increase the quantity of iPhone from 1 to 2 and verify the updated line total", async ({
    page,
  }) => {
    // Remove MacBook from Cart
    // Clicking the delete button for MacBook
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(4).click();

    //Step 1: Update iPhone Quantity 1 -> 2
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input')
      .first()
      .click();
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input')
      .first()
      .fill("2");

    // Click the update button to save quantity change
    await page.getByRole("button").nth(4).click();

    // Verify Success Message and Product Totals
    await expect(page.getByText("Success: You have modified")).toBeVisible();

    // Verify unit price for iPhone
    await expect(
      page.getByRole("cell", { name: "$123.20" }).first(),
    ).toBeVisible();

    // Verify total price for 2 iPhones
    await expect(
      page.getByRole("cell", { name: "$246.40" }).nth(1),
    ).toBeVisible();

    // Verify Cart Summary
    await expect(page.getByText("Sub-Total:")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$202.00" })).toBeVisible();
    await expect(page.getByText("Eco Tax (-2.00):")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$4.00" })).toBeVisible();
    await expect(page.getByText("VAT (20%):")).toBeVisible();
    await expect(page.getByRole("cell", { name: "$40.40" })).toBeVisible();
    await expect(page.getByText("Total:", { exact: true })).toBeVisible();
    await expect(
      page.locator('//*[@id="content"]/div[2]/div/table/tbody/tr[4]/td[2]'),
    ).toContainText("$246.40");
  });

  test("Case 3: Decrease the quantity of MacBook from 2 to 1 and verify the updated line total", async ({
    page,
  }) => {
    // Remove iPhone from Cart
    // Clicking the delete button for iPhone
    await page
      .locator(
        '//*[@id="content"]/form/div/table/tbody/tr[1]/td[4]/div/span/button[2]',
      )
      .click();

    //Step 1: Update MacBook Quantity 2 -> 1
    await page
      .locator('//td[a[text()="MacBook"]]/following-sibling::td[2]/div/input')
      .click();

    // Step 1: Fill MacBook quantity input
    await page
      .locator('//td[a[text()="MacBook"]]/following-sibling::td[2]/div/input')
      .fill("1");

    // Click the update button to save quantity change
    await page.getByRole("button").nth(4).click();

    // Verify Success Message and Product Totals
    await expect(page.getByText("Success: You have modified")).toBeVisible();

    // Verify unit price for MacBook
    await expect(
      page
        .getByRole("row", { name: /MacBook/ })
        .getByRole("cell")
        .nth(4),
    ).toHaveText("$602.00");

    // Verify total price for MacBook
    await expect(
      page
        .getByRole("row", { name: /MacBook/ })
        .getByRole("cell")
        .nth(5),
    ).toHaveText("$602.00");

    // Verify Cart Summary
    await expect(page.getByRole("cell", { name: "Sub-Total:" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "$500.00" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Eco Tax (-2.00):" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "$2.00" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "VAT (20%):" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "$100.00" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Total:", exact: true }),
    ).toBeVisible();
    await expect(
      page.locator('//*[@id="content"]/div[2]/div/table/tbody/tr[4]/td[2]'),
    ).toHaveText("$602.00");
  });

  test("Case 4: Verify Handling of Negative Quantity Input for Three Products", async ({
    page,
  }) => {
    // 2 MacBook -1
    //Step 1: Update MacBook Quantity 2 -> -1
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr[2]/td[4]/div/input')
      .click();

    // Step 1: Fill MacBook quantity input
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr[2]/td[4]/div/input')
      .fill("-1");

    // Click the update button to save quantity change
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(3).click();

    // Verify Success Message and Product Totals
    await expect(page.getByText("Success: You have modified")).toBeVisible();

    // 1 iPhone  -1
    //Step 1: Update iPhone Quantity 1 -> -1
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr[1]/td[4]/div/input')
      .click();

    // Step 1: Fill iPhone quantity input
    await page
      .locator('//*[@id="content"]/form/div/table/tbody/tr[1]/td[4]/div/input')
      .fill("-1");

    // Click the update button to save quantity change
    await page.getByRole("button").nth(5).click();

    //Empty cart visibility
    await expect(
      page.getByRole("heading", { name: "Shopping Cart" }),
    ).toBeVisible();
    await expect(
      page.locator("#content").getByText("Your shopping cart is empty!"),
    ).toBeVisible();
    await page.getByRole("link", { name: "Continue" }).click();

    await expect(page).toHaveTitle("Your Store");
    await expect(page).toHaveURL(
      "https://tutorialsninja.com/demo/index.php?route=common/home",
    );
  });
});
