// @ts-check
import { test, expect, APIRequestContext } from "@playwright/test";
import { RestApi } from "../components/api/restapi";
import { GetUserPosts, CreatePost } from "../pages/api/gorestapipost";
import { GOREST_DATA } from "../data/gorestData";

const token = GOREST_DATA.token;
const mainUrl = GOREST_DATA.url;

test.describe("REST API Tests: Posts", () => {
	let getUserPosts: GetUserPosts;
	let createPost: CreatePost;

	test.beforeEach(async ({ request }: { request: APIRequestContext }) => {
		const restApi = new RestApi(request, token);
		getUserPosts = new GetUserPosts(restApi);
		createPost = new CreatePost(restApi);
	});

	test("Get list of comments", async () => {
		const url = `${mainUrl}comments`;
		const status = 200;
		const expectedLength = 10;

		const comments = await getUserPosts.getData(
			url,
			status,
			expectedLength
		);
		expect(comments[0]).toHaveProperty("id");
		expect(comments[0]).toHaveProperty("body");
		expect(comments[0]).toHaveProperty("email");
		expect(comments[0]).toHaveProperty("name");
		expect(comments[0]).toHaveProperty("post_id");
	});

	test("Get list of todos", async () => {
		const url = `${mainUrl}todos`;
		const status = 200;
		const expectedLength = 10;

		const todos = await getUserPosts.getData(url, status, expectedLength);
		expect(todos[0]).toHaveProperty("id");
		expect(todos[0]).toHaveProperty("user_id");
		expect(todos[0]).toHaveProperty("title");
		expect(todos[0]).toHaveProperty("due_on");
		expect(todos[0]).toHaveProperty("status");
	});

	test("Get list of posts", async () => {
		const url = `${mainUrl}posts`;
		const status = 200;
		const expectedLength = 10;

		const posts = await getUserPosts.getData(url, status, expectedLength);
		expect(posts[0]).toHaveProperty("id");
		expect(posts[0]).toHaveProperty("user_id");
		expect(posts[0]).toHaveProperty("title");
		expect(posts[0]).toHaveProperty("body");
		console.log(posts[0]);
	});

	test("Create post and verify data", async () => {
		const post = {
			title: "Test Post",
			body: "Test Post Body",
		};
		const url = `${mainUrl}users/7618858/posts`;
		const expectedStatus = 201;

		const createdPost = await createPost.createPost(
			url,
			post,
			expectedStatus
		);
		expect(createdPost).toHaveProperty("id");
		expect(createdPost).toHaveProperty("user_id");
		expect(createdPost).toHaveProperty("title");
		expect(createdPost).toHaveProperty("body");
	});
});
