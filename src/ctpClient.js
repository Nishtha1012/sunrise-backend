const { client } = require("./config");
const {
  ApiRoot,
  createApiBuilderFromCtpClient,
} = require("@commercetools/platform-sdk");

/**
 * Load the project key from environment variables.
 */
const projectKey = process.env.CTP_PROJECT_KEY;

/**
 * Create an instance of the API builder using the Commerce Tools client.
 * The `apiRoot` object will provide access to various API endpoints.
 */
const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey,
});

module.exports = { apiRoot };
