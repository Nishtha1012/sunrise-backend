const { ApolloServer } = require("@apollo/server");
const { typeDefs } = require("./src/schema/productSchema");
const { resolvers } = require("./src/resolver/productResolver");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const express = require("express");

const http = require("http");

const bodyParser = require("body-parser");

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const app = express();
  const httpServer = http.createServer(app);

  await server.start();

  app.use(
    "/",
    cors({
      origin: "http://localhost:3000", 
      origin:"https://sunrise-frontend.vercel.app/",
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  await new Promise((resolve) => httpServer.listen({ port: 8000 }, resolve));

  console.log(`server is running `);
})();
