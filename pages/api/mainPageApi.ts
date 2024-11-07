import { expect } from "@playwright/test";

export class MainPageApiTesting {
    request;

    constructor(request) {
        this.request = request;
    }

    async  getStatus (endPoint: string, status: number) {
        const response =  await  this.request.get(endPoint);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(status);
    }
}