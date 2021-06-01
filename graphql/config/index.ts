import { gql } from "apollo-server-lambda";
import resolvers from "./resolvers";
import dataSources from "../../datasources";

import OtterRepository from "../../datasources/repositories/otter.repository";

// const schema = fs.readFileSync(path.resolve("graphql/schema.graphql"), {
//   encoding: "utf-8",
// });

const typeDefs = gql`
  type Otter {
    id: ID!
    name: String
    location: String
    about: String
    imageUrl: String
  }

  type OtterList {
    data: [Otter]
  }

  input CreateOtterInput {
    name: String!
    location: String!
    about: String!
    imageUrl: String!
  }

  input GetOtterInput {
    id: ID!
  }

  type Query {
    getOtter(input: GetOtterInput): Otter
    getOtterList: OtterList
  }

  type Mutation {
    createOtter(input: CreateOtterInput): Otter
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export interface Context {
  db: {
    otters: OtterRepository;
  };
}
const context: Context = {
  db: dataSources,
};

export default {
  context,
  resolvers,
  typeDefs,
};
