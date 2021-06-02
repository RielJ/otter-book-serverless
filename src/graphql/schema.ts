import { gql } from "apollo-server-lambda";

const schema = gql`
  type Otter {
    id: ID!
    name: String
    location: String
    about: String
    imageUrl: String
  }

  input CreateOtterInput {
    name: String!
    location: String!
    about: String!
    imageUrl: String
  }

  input GetOtterInput {
    id: ID!
  }

  type Query {
    getOtter(input: GetOtterInput): Otter
    getOtterList: [Otter]
  }

  type Mutation {
    createOtter(input: CreateOtterInput): Otter
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default schema;
