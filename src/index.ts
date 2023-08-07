import express from 'express';

import { ApolloServer } from 'apollo-server-express';

import dotenv from 'dotenv';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer().then(() => {
  app.listen(PORT, () => {
    console.log(`
      ##############################################################
      🎉 This is movie-ql server with express-graphql
              🛡️  http://localhost:${PORT}/graphql 🛡️
      ##############################################################
    `);
  });
});