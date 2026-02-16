import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://tutorialsninja.com/demo/index.php?route=common/home",
  );
});

test.describe("Add to Cart", () => {
  test("should add one product and remove it from cart", async ({ page }) => {
    // Add product
    await page.getByRole("button", { name: " Add to Cart" }).first().click();
    await expect(page.getByText("Success: You have added")).toContainText(
      "MacBook",
    );

    // Verify 1 items in cart
    await expect(
      page.getByRole("button", { name: / 1 item\(s\) - \$/ }),
    ).toBeVisible();
    await page.getByRole("button", { name: / 1 item\(s\) - \$/ }).click();

    //Remove item
    await page.getByTitle("Remove").first().click();
    await expect(
      page.getByRole("button", { name: / 0 item\(s\) - \$/ }),
    ).toBeVisible();

    // Verify empty cart
    await page.getByRole("button", { name: / 0 item\(s\) - \$/ }).click();
    await expect(page.getByText("Your shopping cart is empty!")).toBeVisible();
  });

  test("should add two products and remove them from cart", async ({
    page,
  }) => {
    // Add first product
    await page.getByRole("button", { name: " Add to Cart" }).first().click();
    await expect(page.getByText("Success: You have added")).toContainText(
      "MacBook",
    );

    // Verify 1 items in cart
    await expect(
      page.getByRole("button", {
        name: / 1 item\(s\) - \$/,
      }),
    ).toBeVisible();

    // Add second product
    await page.getByRole("button", { name: " Add to Cart" }).nth(1).click();
    await expect(page.getByText("Success: You have added")).toContainText(
      "iPhone",
    );

    // Verify 2 items in cart
    await expect(
      page.getByRole("button", {
        name: / 2 item\(s\) - \$/,
      }),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: / 2 item\(s\) - \$/,
      })
      .click();
    // Remove first product
    await page
      .getByRole("row", { name: "MacBook MacBook x1 $602.00 " })
      .getByRole("button")
      .click();

    // Verify 1 item remains
    await expect(
      page.getByRole("button", {
        name: / 1 item\(s\) - \$/,
      }),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: / 1 item\(s\) - \$/,
      })
      .click();

    // Remove remaining product
    await page.getByTitle("Remove").first().click();

    // Verify empty cart
    await expect(
      page.getByRole("button", { name: / 0 item\(s\) - \$/ }),
    ).toBeVisible();
    await page.getByRole("button", { name: / 0 item\(s\) - \$/ }).click();

    await expect(page.getByText("Your shopping cart is empty!")).toBeVisible();
  });

  test("should display correct inner content on View Cart page", async ({
    page,
  }) => {
    //Add items
    await page.getByRole("button", { name: " Add to Cart" }).first().click();
    await expect(page.getByText("Success: You have added")).toContainText(
      "MacBook",
    );
    await expect(
      page.getByRole("button", { name: / 1 item\(s\) - \$/ }),
    ).toBeVisible();

    await page.getByRole("button", { name: " Add to Cart" }).first().click();
    await expect(page.getByText("Success: You have added")).toContainText(
      "MacBook",
    );
    await expect(
      page.getByRole("button", { name: / 2 item\(s\) - \$/ }),
    ).toBeVisible();
    await page.getByRole("button", { name: " Add to Cart" }).nth(1).click();
    await expect(page.getByText("Success: You have added")).toContainText(
      "iPhone",
    );
    await expect(
      page.getByRole("button", { name: / 3 item\(s\) - \$/ }),
    ).toBeVisible();

    //Open cart
    await page.getByRole("button", { name: / 3 item\(s\) - \$/ }).click();
    await expect(
      page.getByText(
        "iPhone x1 $123.20 MacBook x2 $1,204.00 Sub-Total $1,101.00 Eco Tax (-2.00) $6.",
      ),
    ).toBeVisible();

    //first item visibility
    await expect(
      page.getByRole("cell", { name: "iPhone" }).first(),
    ).toBeVisible();
    await expect(
      page.locator("td").filter({ hasText: "iPhone" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "x1" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "$123.20" })).toBeVisible();
    await expect(
      page
        .getByRole("row", { name: "iPhone iPhone x1 $123.20 " })
        .getByRole("button"),
    ).toBeVisible();

    //second item visibility
    await expect(
      page.getByRole("cell", { name: "MacBook" }).first(),
    ).toBeVisible();
    await expect(
      page.locator("td").filter({ hasText: "MacBook" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "x2" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "$1,204.00" })).toBeVisible();
    await expect(
      page
        .getByRole("row", { name: "MacBook MacBook x2 $1,204.00 " })
        .getByRole("button"),
    ).toBeVisible();

    //Pricing details
    await expect(page.getByRole("cell", { name: "Sub-Total" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "$1,101.00" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Eco Tax (-2.00)" }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "$6.00" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "VAT (20%)" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "$220.20" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Total", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "$1,327.20" })).toBeVisible();
    await expect(page.getByRole("link", { name: " View Cart" })).toBeVisible();
    await expect(
      page.locator("#cart").getByRole("link", { name: " Checkout" }),
    ).toBeVisible();
  });
});
