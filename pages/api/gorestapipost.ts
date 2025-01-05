import { expect } from "playwright/test";
import { RestApi } from "../../components/api/restapi";

export class GetUserPosts {
	private readonly client: RestApi;

	constructor(client: RestApi) {
		this.client = client;
	}

	async getData(url: string, expectedStatus: number, expectedLength: number) {
		const response = await this.client.getApi(url);

		const data = await response.json();

		expect(response.status()).toBe(expectedStatus);
		expect(data).toHaveLength(expectedLength);

		return data;
	}
}

export class CreatePost {
	private readonly client: RestApi;

	constructor(client: RestApi) {
		this.client = client;
	}

	async createPost(url: string, postData: object, expectedStatus: number) {
		const response = await this.client.postApi(url, postData);

		const result = await response.json();
		expect(response.ok()).toBeTruthy();
		expect(response.status()).toBe(expectedStatus);
		expect(result).toHaveProperty("id");
		return result;
	}
}