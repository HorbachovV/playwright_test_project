import { APIRequestContext } from "playwright/test";


export class GraphQLClient {
    private readonly request: APIRequestContext;

    constructor (request: APIRequestContext) {
        this.request = request
    }

    async sendQuery (query: string, variables: Record<string, unknown> ={}) {
        const response = await this.request.post("https://gorest.co.in/public/v2/graphql", {
            headers: {
                Authorization: "Bearer 60af87747e81d4ebdfcff9e7664127165c2dac89be65209be8fcc52c9b6e344c"
            },
            data: {
                query,
                variables
            },
        });

        if (!response.ok()) {
            throw new Error("GraphQL request failed: ${response.status()} ${await response.text()}`")
        }

        const result = await response.json();
        return result
    }
}