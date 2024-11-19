
export class GraphQLApi {
    request;

    constructor(request) {
        this.request = request
    }

    async graphQuery (endpoint: string, data: object) {
        return await this.request.post(endpoint, data)
    }

}