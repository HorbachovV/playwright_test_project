import { Page } from "@playwright/test";
import { Search } from "../../components/searching";

export class MainPageFiltration {
    readonly page: Page;
    readonly search :Search;


    constructor (page: Page) {
        this.page = page;
        this.search = new Search(page)
    }

    async selectType (locator: string, value: string) {
        await this.search.startSearch(locator, value)
    }
}