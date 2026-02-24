# Your Store Automation Testing 🛍️

Automated end‑to‑end testing suite for the **Your Store** e‑commerce web application using **Playwright** and **TypeScript**.

This project demonstrates automated UI test scenarios on a real online store, including user interactions, UI validations, shopping workflows, and navigation flows — implemented with modern QA best practices in Playwright.:contentReference[oaicite:0]{index=0}

---

## 👩‍💻 Author

**Karine Gasesyan**  
QA Automation Engineer | Playwright | Automation Testing | 10+ Years Frontend Development  
GitHub: https://github.com/karinegasesyan

---

## 📌 Project Summary

This repository contains automated browser tests that simulate real user journeys on the **Your Store** online shop.

Key areas covered:

- 🧪 User login and validation  
- 🛒 Adding products to cart  
- 🔍 Product search and filters  
- 🧾 Checkout flow interaction  
- 🔄 Navigation and UI assertions  

Playwright enables fast, cross‑browser automation and reliable test execution for modern web apps.:contentReference[oaicite:1]{index=1}

---

## 🛠 Tech Stack

| Technology       | Purpose                          |
|------------------|----------------------------------|
| **Playwright**   | Browser automation & end‑to‑end testing |
| **TypeScript**   | Strong typing & maintainable test code |
| **Node.js**      | JavaScript runtime               |
| **npm**          | Dependency management            |

---

## 📁 Project Structure

```
Your-Store-automation-testing-with-playwright/
├── tests/
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── navigation.spec.ts
├── pageObjects/
│   ├── login.page.ts
│   ├── products.page.ts
│   └── cart.page.ts
├── package.json
├── playwright.config.ts
└── README.md
```

> *Tip:* A **page object model (POM)** structure makes tests readable and maintainable as the suite grows.:contentReference[oaicite:2]{index=2}

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/karinegasesyan/Your-Store-automation-testing-with-playwright.git
```

### 2. Move into the project folder

```bash
cd Your-Store-automation-testing-with-playwright
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install Playwright browsers

```bash
npx playwright install
```

---

## 🚀 Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run Playwright test UI

```bash
npx playwright test --ui
```

### Run with detailed reporter

```bash
npx playwright test --reporter=list
```

---

## 🧪 Test Scenarios Covered

### 🔹 Login Tests

- Validate homepage loads successfully  
- User login with valid credentials  
- Login form error handling

### 🔹 Product & Cart Tests

- Search for products  
- Add products to cart  
- Validate cart contents

### 🔹 Checkout / Navigation

- Navigate through pages  
- UI element validation  
- Confirm button behaviours

*(Adjust list above to match your actual tests)*

---

## 🧠 What This Project Shows

This suite demonstrates key automation competencies:

✔ E2E UI automation  
✔ Cross‑browser testing  
✔ Page Object Model use  
✔ Typed test code with TypeScript  
✔ Clean test organization

These are real skills expected in QA automation roles.:contentReference[oaicite:3]{index=3}

---

## 📫 Contact & Portfolio

Karine Gasesyan — QA Automation Engineer  
GitHub: https://github.com/karinegasesyan  


---

⭐ If this test suite was helpful, feel free to explore the code and connect!
