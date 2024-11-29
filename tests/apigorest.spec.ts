// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Gorest API testing", () => {
	test("Check response status", async ({ request }) => {
		const response = await request.get(
			"https://gorest.co.in/public/v2/posts"
		);
		const posts = await response.json();

		expect(response.status()).toBe(200);
		expect(posts).toHaveLength(10);
	});

	test("Get list of users", async ({ request }) => {
		const response = await request.get(
			"https://gorest.co.in/public/v2/users"
		);
		const users = await response.json();

		expect(response.status()).toBe(200);
		expect(users).toHaveLength(10);
		expect(users[0]).toHaveProperty("id");
		expect(users[0]).toHaveProperty("name");
		expect(users[0]).toHaveProperty("email");
		expect(users[0]).toHaveProperty("gender");
		expect(users[0]).toHaveProperty("status");
	});
});
