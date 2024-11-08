import { Page } from "@playwright/test";

export class Search {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async startSearch (locator: string, value: string) {
        await  this.page.locator(locator).selectOption({value: value});
    }
}