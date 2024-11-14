// @ts-check
import { test } from '@playwright/test';
import { MainPageApiTesting } from '../pages/api/mainPageApi';


test.describe("Main page API testing", () => {

    test("Check response status", async ({ request}) => {
        const mainPageApiTest = new MainPageApiTesting(request);
    })
})