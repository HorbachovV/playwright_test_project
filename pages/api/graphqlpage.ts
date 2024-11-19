import { GraphQLApi } from "../../components/api/graphql";

export class GraphQLApiTesting {
    private graphQLApi : GraphQLApi

    constructor (graphQLApi: GraphQLApi) {
        this.graphQLApi = graphQLApi
    }

    async query (endpoint: string, data: object) {
        return  this.graphQLApi.graphQuery(endpoint, data)
    }
}