export class RestApi {
	private readonly request;

	constructor(request) {
		this.request = request;
	}

	async getApi(endpoint: string) {
		const response = await this.request.get(endpoint);
		return this.handleResponse(response);
	}

	private async handleResponse(response) {
		if (!response.ok()) {
			throw new Error(`HTTP Error: ${response.status()}`);
		}
		return response;
	}
}
