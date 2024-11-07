// @ts-check
import { test } from '@playwright/test';
import { MainPageApiTesting } from '../pages/api/mainPageApi';
import { linkData } from '../data/mainPageTestData';


test.describe("Main page API testing", () => {

    test("Check response status", async ({ request}) => {
        const mainPageApiTest = new MainPageApiTesting(request);


        for (const value of linkData)  {
            await mainPageApiTest.getStatus(value.link, 200);
        }
        
    })

})