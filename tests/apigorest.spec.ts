// @ts-check
import { test, expect, APIRequestContext } from "@playwright/test";
import { RestApi } from "../components/api/restapi";
import { GetUsersData, CreateUser } from "../pages/api/gorestapi";

test.describe("REST API Tests", () => {
	let getUsersData: GetUsersData;
	let createUser: CreateUser;
	let createdUSer;

	test.beforeEach(async ({ request }: { request: APIRequestContext }) => {
		const token =
			"60af87747e81d4ebdfcff9e7664127165c2dac89be65209be8fcc52c9b6e344c";
		const restApi = new RestApi(request, token);
		getUsersData = new GetUsersData(restApi);
		createUser = new CreateUser(restApi);
	});

	test("Get list of users", async () => {
		const url = "https://gorest.co.in/public/v2/users";
		const status = 200;
		const expectedLength = 10;

		const users = await getUsersData.getData(url, status, expectedLength);
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

		const posts = await getUsersData.getData(url, status, expectedLength);

		expect(posts[0]).toHaveProperty("id");
		expect(posts[0]).toHaveProperty("title");
	});

	test("Create user and verify data", async () => {
		const user = {
			name: "John Smith",
			email: `josmitt${Date.now()}y@mail.test`,
			gender: "male",
			status: "active",
		};
		const url = "https://gorest.co.in/public/v2/users";
		const expectedStatus = 201;

		createdUSer = await createUser.createUser(url, user, expectedStatus);

		expect(createdUSer).toHaveProperty("id");
		expect(createdUSer).toHaveProperty("name");
		expect(createdUSer).toHaveProperty("email");
		expect(createdUSer).toHaveProperty("gender");
		expect(createdUSer).toHaveProperty("status");
	});

	test("Delete created user", async ({ request }) => {
		const userId = createdUSer.id;
		const response = await request.delete(
			`https://gorest.co.in/public/v2/users/${userId}`
		);
		expect(response.status()).toBe(404);
	});
});
