import { expect, Page } from "@playwright/test";
import { Search } from "../../components/searching";

export class MainPageFiltration {
    readonly page: Page;
    readonly search :Search;


    constructor (page: Page) {
        this.page = page;
        this.search = new Search(page)
    }

    async selectType (locator: string, value: string) {
        await this.search.selectOption(locator, value)
    }
    
    async getSelectedType (locator: string): Promise<string> {
        const selectedOption = await this.page.getByLabel(locator).inputValue();
        return selectedOption;
    }
}