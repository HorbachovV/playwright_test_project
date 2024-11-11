import { Page } from "@playwright/test";

export class Search {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectOption (locator: string, value: string) {
        const element = this.page.getByLabel(locator);
        await element.waitFor({state: "visible"});
        await element.selectOption(value)
    }

    async searchOption (searchInputLocator: string, listLocator: string, brandName: string) {
        await this.page.fill(searchInputLocator, brandName);
        await this.page.waitForSelector(`${listLocator} >> text=${brandName}`, { state: 'visible' });
        this.page.locator(`${listLocator} >> text=${brandName}`).click();
    }
}