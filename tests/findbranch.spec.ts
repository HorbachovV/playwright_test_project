// @ts-check
import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/ui/mainPage";

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
	test("Find branch (City)", async ({ page }) => {
		await page.locator("//div[@id='searchModule']//div[3]//a[1]").click();
		//Need to handle popups with geolocation permission
		await page
			.locator(
				"//button[@class='icon-button !bg-gray-100 rounded-full p-1']"
			)
			.click();
		await page.getByPlaceholder("Населений пункт").fill("Львів");
		await page.locator("//li[1]//div[1]//div[1]//div[1]//span[1]").click();
		await page.waitForTimeout(1000);
		const selectedCity = await page
			.locator("//p[@class='font-medium ml-3 font-second']")
			.textContent();
		expect(selectedCity).toBe("місто Львів");
	});
});
