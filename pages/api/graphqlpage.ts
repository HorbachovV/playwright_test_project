import { GraphQLClient } from "../../components/api/graphql";
import { ADD_USER_MUTATION, DELETE_USER_MUTATION} from "../../data/userMutations";

export class UserPage {
    private readonly client: GraphQLClient;

    constructor(client: GraphQLClient) {
        this.client = client;
    }

    async addUser (name: string, gender: string, email: string, status: string) {
        const variables = { name, gender, email, status};
        const response = await this.client.sendQuery(ADD_USER_MUTATION, variables);
        return response.data.createUser.user
    }

    async DELETE_USER_MUTATION(id: string) {
        const variables = { id };
        const response = await this.client.sendQuery(DELETE_USER_MUTATION, variables);
        return response.data.deleteUser;
    }
}