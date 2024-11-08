// @ts-check
import { test, expect } from '@playwright/test';
import { MainPageFiltration } from '../pages/ui/mainPageFiltration';

test.describe("Filtration methods testing", () => {
    test.beforeEach ( async ({ page }) => {
        await page.goto("https://auto.ria.com/uk/", {
            timeout: 10000,
            waitUntil: "domcontentloaded"
        });
    });
    test("Select type", async ({ page }) => {
        // const mainPageFiltration = new MainPageFiltration(page);

        // const select = mainPageFiltration.selectType("#categories", "Легкові");
        // console.log(select)

        await page.locator("#categories").click()
    })
})