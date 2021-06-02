import resolvers from "./resolvers";
import db from "src/datasources/dynamodb";

import OtterRepository from "../../datasources/dynamodb/repositories/otter.repository";
import schema from "src/graphql/schema";

const typeDefs = schema;

export interface Context {
  db: {
    otters: OtterRepository;
  };
}
const context: Context = {
  db,
};

export default {
  context,
  resolvers,
  typeDefs,
};
