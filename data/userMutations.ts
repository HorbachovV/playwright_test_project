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

export const DELETE_USER_MUTATION = `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
