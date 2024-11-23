import { test, expect, APIRequestContext } from "@playwright/test";
import { GraphQLClient } from "../components/api/graphql";
import { FilmPage } from "../pages/api/filmPage";

test.describe("GraphQL Films Tests", () => {
	let filmPage: FilmPage;
  
	test.beforeEach(async ({ request }: { request: APIRequestContext }) => {
	  const graphqlClient = new GraphQLClient(request, "https://swapi-graphql.netlify.app/.netlify/functions/index");
	  filmPage = new FilmPage(graphqlClient);
	});
  
	test("Fetch all films and verify", async () => {
	  	const films = await filmPage.getAllFilms();
  
	  	expect(films).not.toBeNull();
	  	expect(films.length).toBeGreaterThan(0);
  
	  	for (const film of films) {
			expect(film).toHaveProperty("title");
			expect(film).toHaveProperty("director");
			expect(film).toHaveProperty("releaseDate");
  
		if (film.speciesConnection && film.speciesConnection.species) {
		  	for (const species of film.speciesConnection.species) {
				expect(species).toHaveProperty("name");
				expect(species).toHaveProperty("classification");
  
			if (species.homeworld) {
			  	expect(species.homeworld).toHaveProperty("name");
					}
		  		}
			}
	  	}
	});
});