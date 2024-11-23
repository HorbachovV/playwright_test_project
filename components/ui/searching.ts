import { Page } from "@playwright/test";

export class Search {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
	async listItem(selector, firstText: string, secondtText: string) {
		const link = this.page
			.getByRole(selector)
			.filter({ hasText: firstText })
			.first();
		await link.hover();
		await link.click();
		const secondLink = this.page
			.getByRole(selector)
			.filter({ hasText: secondtText })
			.first();
		await secondLink.hover();
		await secondLink.click();
	}
}
