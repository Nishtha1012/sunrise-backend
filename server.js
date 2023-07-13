const { ApolloServer } = require("@apollo/server");
const { typeDefs, productSchema } = require("./src/schema/productSchema");
const {
  resolvers,
  productResolver,
} = require("./src/resolver/productResolver");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const express = require("express");

const http = require("http");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { userSchema } = require("./src/schema/userSchema");
const { userResolver } = require("./src/resolver/userResolver");
const { cartSchema } = require("./src/schema/cartSchema");
const { cartResolver } = require("./src/resolver/cartResolver");

(async () => {
  const server = new ApolloServer({
    typeDefs: [productSchema, userSchema, cartSchema],
    resolvers: [productResolver, userResolver, cartResolver],
  });

  const app = express();
  const httpServer = http.createServer(app);

  await server.start();
  app.use(cookieParser());
  app.use(
    "/",
    cors({
      origin: ["http://localhost:3000", "https://sunrise-frontend.vercel.app"],
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
