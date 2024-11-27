// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Gorest API testing", () => {
	test("Check response status", async ({ request }) => {
		const response = await request.get(
			"https://gorest.co.in/public/v2/posts"
		);
		const posts = await response.json();

		expect(response.status()).toBe(200);
		expect(posts.length).toBe(10);
	});
});
