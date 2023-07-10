const { ClientBuilder } = require("@commercetools/sdk-client-v2");
require("dotenv").config();
const { default: sdkAuth } = require("@commercetools/sdk-auth");

// Load environment variables
const projectKey = process.env.CTP_PROJECT_KEY;

// Configure authentication middleware options
const authMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
  },
  fetch,
};

// Configure HTTP middleware options
const httpMiddlewareOptions = {
  host: process.env.CTP_API_URL,
  fetch,
};

// Create an instance of the Commerce Tools authentication client
const authClient = new sdkAuth({
  host: process.env.CTP_AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
  },
  scopes: [process.env.CTP_SCOPES],
  fetch,
});

// Create an instance of the Commerce Tools client
const client = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

module.exports = { client, authClient };
