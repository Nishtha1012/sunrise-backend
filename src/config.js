const { ClientBuilder } = require("@commercetools/sdk-client-v2");
require("dotenv").config();

const projectKey = process.env.CTP_PROJECT_KEY;

const authMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
  },
  fetch,
};

const httpMiddlewareOptions = {
  host: process.env.CTP_API_URL,
  fetch,
};

const client = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

module.exports = { client };
