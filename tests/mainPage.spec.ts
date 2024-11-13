// @ts-check
import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/ui/mainPage';

test.describe("Testing main page", () => {

    test.beforeEach ( async ({ page }) => {
        const mainPage = new MainPage(page);
        await page.goto("https://novaposhta.ua/", {
            timeout: 10000,
            waitUntil: "domcontentloaded"
        });
        await page.locator("img[alt='Новий сайт']").click()
        const pageTitle = await mainPage.checkTitle();
        expect(pageTitle).toBe("Нова пошта - доставка майбутнього");
    })

    test.skip ("Verify links hover color", async ({ page }) => {
        const mainPage = new MainPage(page);
        const linkColor = await mainPage.checkColor(true, "//li[@class='nav-item font-second']//div[contains(text(),'Відправити')]")
        expect(linkColor).toBe("rgb(218, 41, 28)")
    })
    
    test.skip ("Verify links color", async ({ page }) => {
        const mainPage = new MainPage(page);
        const linkColor = await mainPage.checkColor(false, "(//div[contains(text(),'Відправити')])[1]")
        expect(linkColor).toBe("rgb(0, 0, 0)")
    })
    
    test('Find links', async ({ page }) => {
        
         
        
        // for (const row of await page.getByRole('listitem').all())
        //     console.log(await row.textContent()
        // );

        const link = page.getByRole("listitem").filter({hasText: "Відправити"}).first() 

        await link.hover();
        await link.click();

        const secondLink = page.getByRole("listitem").filter({hasText: "Відправити з відділення "}).first(); 
        await secondLink.hover();
        await secondLink.click();
       
    });

    
})