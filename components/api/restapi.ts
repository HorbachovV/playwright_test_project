export class RestApi {
	private readonly request;
	private readonly token: string;

	constructor(request, token: string) {
		this.request = request;
		this.token = token;
	}

	async getApi(endpoint: string) {
		const response = await this.request.get(endpoint);
		return this.handleResponse(response);
	}

	async postApi(endpoint: string, data: object) {
		return await this.request.post(endpoint, {
			headers: {
				Authorization: `Bearer ${this.token}`,
				"Content-Type": "application/json",
			},
			data,
		});
	}

	async putApi(endPoint: string, data: object) {
		return await this.request.put(endPoint, {
		  data,
		  headers: this.token
			? { Authorization: `Bearer ${this.token}` }
			: {},
		});
	  }

	private async handleResponse(response) {
		if (!response.ok()) {
			throw new Error(`HTTP Error: ${response.status()}`);
		}
		return response;
	}
}
