import { test, expect, APIRequestContext } from '@playwright/test';
import { UserPage } from '../pages/api/graphqlpage';
import { GraphQLClient } from '../components/api/graphql';

test.describe('GraphQL Tests using compnent', () => {
    let userPage: UserPage;

    test.beforeEach(async ({ request }: { request: APIRequestContext }) => {
        const graphqlClient = new GraphQLClient(request);
        userPage = new UserPage(graphqlClient);
    });

    test("Create a user", async () => {
      const user = await userPage.addUser(
        "James Bond",
        "male",
        `bond.j.${Date.now()}@example.com`,
        "active"
      )
      	expect(user.name).toBe("James Bond");
      	expect(user.gender).toBe("male");
     	  expect(user.status).toBe("active");
		
    });
});