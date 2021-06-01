export default {
  graphql: {
    handler: "handler.graphql",
    description: "GraphQL Endpoint",
    events: [
      {
        http: {
          path: "graphql",
          method: "any",
          cors: true,
        },
      },
    ],
  },
};
