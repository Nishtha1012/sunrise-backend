const { gql } = require("apollo-server");

const userSchema = gql`
  scalar JSON

  type Query {
    verifyToken: JSON
  }

  type Mutation {
    getCtToken(id: String!): loginResponse
    checkExisting(email: String!, phoneNumber: String!): exists
    signupUserCT(token: String!): customer
    signUpWithSocials(token: String!): JSON
    getSocialToken(id: String!): loginResponse
    encryptPassword(password: String!): JSON
  }

  type exists {
    exists: String
  }

  type customer {
    id: String
  }

  type loginResponse {
    email: String
    phone_number: String
    uid: String
  }
`;

module.exports = { userSchema };
