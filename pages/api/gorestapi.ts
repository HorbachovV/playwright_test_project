import { expect } from "playwright/test";
import { RestApi } from "../../components/api/restapi";

export class GetUsersData {
	private readonly client: RestApi;

	constructor(client: RestApi) {
		this.client = client;
	}

	async getAllPosts(
		url: string,
		expectedStatus: number,
		expectedLength: number
	) {
		const response = await this.client.getApi(url);

		const data = await response.json();

		expect(response.status()).toBe(expectedStatus);
		expect(data).toHaveLength(expectedLength);

		return data;
	}
}
