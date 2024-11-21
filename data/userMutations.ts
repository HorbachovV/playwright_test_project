export const ADD_USER_MUTATION = `
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
