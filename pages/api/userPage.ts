import { GraphQLClient } from "../../components/api/graphql";
import { ADD_USER_MUTATION } from "../../data/userMutations";

export class UserPage {
	private readonly client: GraphQLClient;

	constructor(client: GraphQLClient) {
		this.client = client;
	}

	async addUser(name: string, gender: string, email: string, status: string) {
		const response = await this.client.sendQuery(ADD_USER_MUTATION, {
			name,
			gender,
			email,
			status,
		});
		return response;
	}
}
