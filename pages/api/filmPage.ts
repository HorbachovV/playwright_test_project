import { GraphQLClient } from "../../components/api/graphql";
import { GET_ALL_FILMS_QUERY } from "../../data/filmQueries";

export class FilmPage {
	private readonly client: GraphQLClient;

	constructor(client: GraphQLClient) {
		this.client = client;
	}

	async getAllFilms() {
		const response = await this.client.sendQuery(GET_ALL_FILMS_QUERY);
		return response.data.allFilms.films;
	}
}
