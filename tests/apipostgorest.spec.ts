// @ts-check
import { test, expect, APIRequestContext } from "@playwright/test";
import { RestApi } from "../components/api/restapi";
import { GetUserPosts } from "../pages/api/gorestapipost";
import { GOREST_DATA } from "../data/gorestData";

const token = GOREST_DATA.token;
const mainUrl = GOREST_DATA.url;

test.describe("REST API Tests: Posts", () => {
	let getUserPosts: GetUserPosts;

	test.beforeEach(async ({ request }: { request: APIRequestContext }) => {
		const restApi = new RestApi(request, token);
		getUserPosts = new GetUserPosts(restApi);
	});

	test("Get list of posts", async () => {
		const url = `${mainUrl}posts`;
		const status = 200;
		const expectedLength = 10;

		await getUserPosts.getData(url, status, expectedLength);
	});

	test("Get list of comments", async () => {
		const url = `${mainUrl}comments`;
		const status = 200;
		const expectedLength = 10;

		await getUserPosts.getData(url, status, expectedLength);
	});

	test("Get list of todos", async () => {
		const url = `${mainUrl}todos`;
		const status = 200;
		const expectedLength = 10;

		await getUserPosts.getData(url, status, expectedLength);
	});
});
