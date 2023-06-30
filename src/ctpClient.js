const { client } = require("./config");
const {
  ApiRoot,
  createApiBuilderFromCtpClient,
} = require("@commercetools/platform-sdk");

const projectKey = process.env.CTP_PROJECT_KEY;

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey,
});

module.exports = { apiRoot };
