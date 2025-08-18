import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import resolvers from "./resolvers/index.js";
import storeIdentifctionMiddleware from "../middleware/storeIdentifctionMiddleware.js";
import { schema as typeDefs } from "./schema.js";

export async function setupGraphQL(app) {
  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({ schema: executableSchema });
  await server.start();

  app.use(
    "/graphql",
    express.json(),
    storeIdentifctionMiddleware, // This must set req.storeId
    expressMiddleware(server, {
    context: async ({ req }) => ({ req }) // Pass to resolvers
    })
  );
}
