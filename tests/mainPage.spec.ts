// @ts-check
import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/ui/mainPage";
import { MainPageSearch } from "../pages/ui/mainPageSearch";

test.describe("Testing main page", () => {
	test.beforeEach(async ({ page }) => {
		const mainPage = new MainPage(page);
		await page.goto("https://novaposhta.ua/", {
			timeout: 10000,
			waitUntil: "domcontentloaded",
		});
		await page.locator("img[alt='Новий сайт']").click();
		const pageTitle = await mainPage.checkTitle();
		expect(pageTitle).toBe("Нова пошта - доставка майбутнього");
	});
	test("Verify links hover color", async ({ page }) => {
		const mainPage = new MainPage(page);
		const linkColor = await mainPage.checkColor(
			true,
			"//li[@class='nav-item font-second']//div[contains(text(),'Відправити')]"
		);
		expect(linkColor).toBe("rgb(218, 41, 28)");
	});
	test("Verify links color", async ({ page }) => {
		const mainPage = new MainPage(page);
		const linkColor = await mainPage.checkColor(
			false,
			"(//div[contains(text(),'Відправити')])[1]"
		);
		expect(linkColor).toBe("rgb(0, 0, 0)");
	});
	test("Find links", async ({ page }) => {
		const search = new MainPageSearch(page);
		await search.findAndClickLink(
			"listitem",
			"Відправити",
			"Відправити з відділення "
		);
	});
});
