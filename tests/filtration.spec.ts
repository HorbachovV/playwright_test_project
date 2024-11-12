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
    test("Check selected type by value", async ({ page }) => {
        const mainPageFiltration = new MainPageFiltration(page);
        await mainPageFiltration.selectType("Тип транспорту", "6");
        const selectedType = await mainPageFiltration.getSelectedType("Тип транспорту");
        expect(selectedType).toBe("6");
    })
    test("Check all available type", async ({ page }) => {
        const dropDownList = page.locator("#categories > option");
        await expect(dropDownList).toHaveText(["Будь-який", "Легкові", "Мото", "Вантажівки", "Причепи", "Спецтехніка", "Сільгосптехніка", "Автобуси", "Водний транспорт", "Повітряний транспорт", "Автобудинки"]);
    })
    test("Check selected type by text", async ({ page }) => {
        const mainPageFiltration = new MainPageFiltration(page);
        await mainPageFiltration.selectType("Тип транспорту", "Легкові");
        await expect(page.locator('#categories option[selected="selected"]')).toHaveText('Легкові');   
    })
})

