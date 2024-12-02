// @ts-check
import { test, expect, APIRequestContext } from "@playwright/test";
import { RestApi } from "../components/api/restapi";
import { GetUsersData } from "../pages/api/gorestapi";

test.describe("REST API Tests", () => {
	let getUsersData: GetUsersData;

	test.beforeEach(async ({ request }: { request: APIRequestContext }) => {
		const restApi = new RestApi(request);
		getUsersData = new GetUsersData(restApi);
	});

	test.skip("Get list of users", async ({ request }) => {
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

	test("Get all posts and verify data", async () => {
		const url = "https://gorest.co.in/public/v2/posts";
		const status = 200;
		const expectedLength = 10;

		const posts = await getUsersData.getAllPosts(
			url,
			status,
			expectedLength
		);

		expect(posts[0]).toHaveProperty("id");
		expect(posts[0]).toHaveProperty("title");
	});
});
