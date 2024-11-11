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

    test("Check searched brand", async ({ page }) => {
        const brandInputId = "#brandTooltipBrandAutocompleteInput-brand";
        const listLocator = '.item.bold';
        const expectedBrand = "Toyota";

        // const mainPageFiltration = new MainPageFiltration(page);

        // await mainPageFiltration.getSearchedBrand("#brandTooltipBrandAutocompleteInput-brand", "Ford", "ul>li")
        // const selectedBrand = page.inputValue("//input[@id='brandTooltipBrandAutocompleteInput-brand']");
        // expect(selectedBrand).toBe("Ford")
        // await page.locator("//input[@id='brandTooltipBrandAutocompleteInput-brand']").fill("Ford");


        // await page.fill(brandInputId, expectedBrand);
      
        // await page.waitForSelector(`${listLocator} >> text=${expectedBrand}`, { state: 'visible' });
        // page.locator(`${listLocator} >> text=${expectedBrand}`).click();

        await page.fill("#brandTooltipBrandAutocompleteInput-brand", "Audi")
        const select = await page.locator("#brandTooltipBrandAutocompleteInput-brand")
        expect(select).toHaveText("sdgdfs")
        // .unstyle.scrollbar.autocomplete-select.hide> ul>li >> text="Ford"
    })
})

