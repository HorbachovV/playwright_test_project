import { Page } from "@playwright/test";

export class Search {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectOption (locator: string, value: string) {
        // await this.page.getByLabel(locator).selectOption(value);

        const element = await this.page.getByLabel(locator);
        await element.waitFor({state: "visible"});
        await element.selectOption(value)
    }
}