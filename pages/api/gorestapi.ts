import { expect } from "playwright/test";
import { RestApi } from "../../components/api/restapi";

export class GetUsersData {
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

export class CreateUser {
	private readonly client: RestApi;

	constructor(client: RestApi) {
		this.client = client;
	}

	async createUser(url: string, userData: object, expectedStatus: number) {
		const response = await this.client.postApi(url, userData);

		const result = await response.json();
		expect(response.ok()).toBeTruthy();
		expect(response.status()).toBe(expectedStatus);
		expect(result).toHaveProperty("id");
		return result;
	}
}

export class UpdateUserData {
	private readonly client: RestApi;

	constructor(client: RestApi) {
		this.client = client;
	}

	async updateUser(
		url: string,
		userId: number,
		data: object,
		expectedStatus: number
	) {
		const response = await this.client.putApi(`${url}/${userId}`, data);
		const updatedUser = await response.json();

		expect(response.ok()).toBeTruthy();
		expect(response.status()).toBe(expectedStatus);
		//   expect(updatedUser).toMatchObject(data);

		return updatedUser;
	}
}
