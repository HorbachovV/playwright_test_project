import { APIRequestContext } from "playwright/test";

export class GraphQLClient {
	private readonly request: APIRequestContext;
	private readonly baseUrl: string;
	private readonly authToken?: string;

	constructor(
		request: APIRequestContext,
		baseUrl: string,
		authToken?: string
	) {
		this.request = request;
		this.baseUrl = baseUrl;
		this.authToken = authToken;
	}

	async sendQuery(query: string, variables?: Record<string, any>) {
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
		};

		if (this.authToken) {
			headers.Authorization = `Bearer ${this.authToken}`;
		}

		const response = await this.request.post(this.baseUrl, {
			headers,
			data: {
				query,
				variables,
			},
		});

		const responseBody = await response.json();

		if (response.status() !== 200 || responseBody.errors) {
			throw new Error(
				`GraphQL Error: ${JSON.stringify(responseBody.errors, null, 2)}`
			);
		}

		return responseBody;
	}
}
