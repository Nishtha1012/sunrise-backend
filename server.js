// const express = require("express");
// const { getClient } = require("./src/config");
// const { router } = require("./src/router/productRoute");

// const app = express();
const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./src/schema/productSchema");
const { resolvers } = require("./src/resolver/productResolver");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(8000).then(({ url }) => {
  console.log(`server is running at ${url}`);
});
// app.use("/product", router);

// app.listen(8000, () => {
//   console.log("connected");
// });
