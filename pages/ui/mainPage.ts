import { Page } from '@playwright/test';

export class MainPage {
    readonly page: Page

    constructor (page: Page) {
        this.page = page
    }

    async checkTitle (): Promise<string> {
        return this.page.title();
    }
    async checkLinks (locator: string): Promise<string> {
        await this.page.locator(locator).click();
        const pageTitle = this.checkTitle();
        return pageTitle
    }
    async checkColor (locator: string): Promise<string> {
        await this.page.hover(locator)

        const hoverColor = await this.page.$eval(locator, (element: HTMLLinkElement) => {
            return window.getComputedStyle(element).color
        })
        return hoverColor
    }

}