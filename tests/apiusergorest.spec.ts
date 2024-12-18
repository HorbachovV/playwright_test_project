// @ts-check
import { test, expect, APIRequestContext } from "@playwright/test";
import { RestApi } from "../components/api/restapi";
import {
	GetUsersData,
	CreateUser,
	UpdateUserData,
} from "../pages/api/gorestapiuser";
import { GOREST_DATA } from "../data/gorestData";

const token = GOREST_DATA.token;
const mainUrl = GOREST_DATA.url;

test.describe("REST API Tests: Users", () => {
	let getUsersData: GetUsersData;
	let createUser: CreateUser;
	let updateUserData: UpdateUserData;
	let createdUSer;

	test.beforeEach(async ({ request }: { request: APIRequestContext }) => {
		const restApi = new RestApi(request, token);
		getUsersData = new GetUsersData(restApi);
		createUser = new CreateUser(restApi);
		updateUserData = new UpdateUserData(restApi);
	});

	test("Get list of users", async () => {
		const url = `${mainUrl}users`;
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
		const url = `${mainUrl}posts`;
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
		const url = `${mainUrl}users`;
		const expectedStatus = 201;

		createdUSer = await createUser.createUser(url, user, expectedStatus);

		expect(createdUSer).toHaveProperty("id");
		expect(createdUSer).toHaveProperty("name");
		expect(createdUSer).toHaveProperty("email");
		expect(createdUSer).toHaveProperty("gender");
		expect(createdUSer).toHaveProperty("status");
	});

	test("Update a user", async () => {
		const url = `${mainUrl}users`;
		const userId = createdUSer.id;
		const updatedData = {
			name: "Updated Name",
			email: `updated_email.${Date.now()}@example.com`,
			gender: "male",
			status: "active",
		};

		const response = await updateUserData.updateUser(
			url,
			userId,
			updatedData,
			200
		);

		expect(response.name).toBe(updatedData.name);
		expect(response.email).toBe(updatedData.email);
		expect(response.gender).toBe(updatedData.gender);
		expect(response.status).toBe(updatedData.status);
	});

	test("Delete created user", async ({ request }) => {
		const userId = createdUSer.id;
		const response = await request.delete(`${mainUrl}users/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		expect(response.status()).toBe(204);
	});
});
