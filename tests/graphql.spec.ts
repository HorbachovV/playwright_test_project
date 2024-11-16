import { test, expect } from '@playwright/test';

test.describe("GraphQL API testing", () => {
    test("Fetch all films and verify response", async ({ request }) => {
        const graphqlEndpoint = "https://swapi-graphql.netlify.app/.netlify/functions/index";

        // prepare request
        const query = `
        query Query {
            allFilms {
                films {
                    title
                    director
                    releaseDate
                    speciesConnection {
                        species {
                            name
                            classification
                            homeworld {
                                name
                            }
                        }
                    }
                }
            }
        }`;

        const response = await request.post(graphqlEndpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                query: query,
            },
        });

        // check response
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        // check data structure
        const responseBody = await response.json();
        console.log(responseBody);

        const films = responseBody.data.allFilms.films;
        expect(films.length).toBeGreaterThan(0);

        // check property
        const firstFilm = films[0];
        expect(firstFilm).toHaveProperty('title');
        expect(firstFilm).toHaveProperty('director');
        expect(firstFilm).toHaveProperty('releaseDate');
        expect(firstFilm.speciesConnection.species.length).toBeGreaterThanOrEqual(0);
        console.log(firstFilm)
    });
});
