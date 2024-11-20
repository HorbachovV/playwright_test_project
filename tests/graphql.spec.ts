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

    test("Create a new user", async ({ request }) => {
        const mutation = `
          mutation AddUser($name: String!, $gender: String!, $email: String!, $status: String!) {
            createUser(input: { name: $name, gender: $gender, email: $email, status: $status }) {
              user {
                id
                name
                email
                gender
                status
              }
            }
          }
        `;
    
        const variables = {
          name: "Obi-Wan Kenobi",
          gender: "male",
          email: `obiwankenobi.${Date.now()}@example.com`, // Unique email
          status: "active",
        };
    
        const response = await request.post("https://gorest.co.in/public/v2/graphql", {
          headers: {
            Authorization: `Bearer 60af87747e81d4ebdfcff9e7664127165c2dac89be65209be8fcc52c9b6e344c`,
          },
          data: {
            query: mutation,
            variables,
          },
        });
    
        const result = await response.json();
        console.log(result.data.createUser);
    
        expect(response.ok()).toBeTruthy();
        expect(result.data.createUser.user.name).toBe(variables.name);
        expect(result.data.createUser.user.email).toBe(variables.email);
        expect(result.data.createUser.user.gender).toBe(variables.gender);
        expect(result.data.createUser.user.status).toBe(variables.status);
      });
});
