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
        const mainPageFiltration = new MainPageFiltration(page);

        await mainPageFiltration.selectType("Тип транспорту", "6");
        const selectedType = await mainPageFiltration.getSelectedType("Тип транспорту");
        expect(selectedType).toBe("6")
    })
})

