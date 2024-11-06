// @ts-check
import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/ui/MainPage';
import { linkData } from '../data/mainPageTestData';


test.describe("Auto Ria main page test", () => {
    test.beforeEach ( async ({ page }) => {
        await page.goto("https://auto.ria.com/uk/");
    });

    test ("Check main page title", async ({ page }) => {
        const mainPAge = new MainPage(page);
        const title = await mainPAge.checkTitle();
        expect(title).toBe("AUTO.RIA™ — Автобазар №1, купити та продати перевірене авто легко!")
    })

    test ("Check main links from main page", async ({ page }) => {
        const mainPAge = new MainPage(page);

        for (const value of linkData) {
            const linkColor = await mainPAge.checkColor(value.locator);
            const pageTitle = await mainPAge.checkLinks(value.locator);
            expect(pageTitle).toBe(value.title);
            expect(linkColor).toBe(value.color)
        }
    })
})