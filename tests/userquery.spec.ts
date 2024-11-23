import { test, expect, APIRequestContext } from '@playwright/test';
import { UserPage } from '../pages/api/userPage';
import { GraphQLClient } from '../components/api/graphql';

const AUTH_TOKEN = "60af87747e81d4ebdfcff9e7664127165c2dac89be65209be8fcc52c9b6e344c";

test.describe("GraphQL User Tests with Authentication", () => {
  let userPage: UserPage;

  test.beforeEach(async ({ request }: { request: APIRequestContext }) => {
    const graphqlClient = new GraphQLClient(
      request,
      "https://gorest.co.in/public/v2/graphql",
      AUTH_TOKEN
    );
    userPage = new UserPage(graphqlClient);
  });

  test("Add a new user with authentication", async () => {
    const newUser = await userPage.addUser(
      "Jane Doe",
      "female",
      `jane.doe.${Date.now()}@example.com`,
      "active"
    );
    
    expect(newUser.data.createUser.user).toBeTruthy();
    expect(newUser.data.createUser.user.name).toBe("Jane Doe");
    expect(newUser.data.createUser.user.gender).toBe("female");
    expect(newUser.data.createUser.user.email).toContain("jane.doe");
    expect(newUser.data.createUser.user.status).toBe("active");
  });
});