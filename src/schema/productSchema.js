const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar JSON

  type Query {
    fetchProducts(query: String!): [product]
    singleProduct(id: String!): product
    getAllProducts: [product]
    getSearchSuggesion(term: String!): [suggesion]
  }

  type Mutation {
    getCtToken(id: String!): loginResponse
    checkExisting(email: String!, phoneNumber: String!): exists
    signupUserCT(token: String!): customer
    signUpWithSocials(token: String!): JSON
    getSocialToken(id: String!): loginResponse
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

  type suggesion {
    text: String
  }
  type product {
    id: String
    name: Name
    slug: Name
    metaDescription: Name
    masterVariant: master
  }

  type Name {
    en: String
  }

  type master {
    id: String!
    images: [img]
    sku: String!
    prices: [price]
    attributes: JSON
  }

  type img {
    url: String
  }

  type price {
    value: values
  }

  type values {
    currencyCode: String
    centAmount: Int
  }
`;

module.exports = { typeDefs };
