import { Page } from "@playwright/test";
import { Search } from "../../components/searching";

export class MainPageSearch {
    readonly page: Page;
    readonly search :Search;

    constructor (page: Page) {
        this.page = page;
        this.search = new Search(page)
    }
    async findAndClickLink (selector: string, firstText: string, secondtText: string) {
        await this.search.listItem(selector, firstText, secondtText)
    }
}