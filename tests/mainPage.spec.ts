// @ts-check
import { test, expect } from '@playwright/test';

test.describe("Testing main page", () => {

    test.beforeEach ( async ({ page }) => {
        
        await page.goto("https://novaposhta.ua/", {
            timeout: 10000,
            waitUntil: "domcontentloaded"
        });
        await page.locator("img[alt='Новий сайт']").click()
        const pageTitle = await page.title();
        expect(pageTitle).toBe("Нова пошта - доставка майбутнього");
    })

    test.skip ("Verify links hover color", async ({ page }) => {

        await page.hover("(//div[contains(text(),'Відправити')])[1]")

        const linkColor = await page.$eval("(//div[contains(text(),'Відправити')])[1]", (element: HTMLLinkElement) => {
            return window.getComputedStyle(element).color
        })
        expect(linkColor).toBe("rgb(218, 41, 28)")
    })
    
    test ("Verify links color", async ({ page }) => {

        await page.locator("(//div[contains(text(),'Відправити')])[1]")

        const linkColor = await page.$eval("(//div[contains(text(),'Відправити')])[1]", (element: HTMLLinkElement) => {
            return window.getComputedStyle(element).color
        })
        expect(linkColor).toBe("rgb(0, 0, 0)")
    })

    
})