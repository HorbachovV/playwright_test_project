import { Page } from "@playwright/test";

export class MainPage {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}
	async checkTitle(): Promise<string> {
		return this.page.title();
	}
	async checkColor(hover: boolean, locator: string): Promise<string> {
		if (hover === true) {
			await this.page.hover(locator);
		} else {
			this.page.locator(locator);
		}
		const hoverColor = await this.page.$eval(
			locator,
			(element: HTMLLinkElement) => {
				return window.getComputedStyle(element).color;
			}
		);
		return hoverColor;
	}
}
