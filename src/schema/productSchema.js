const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    fetchProducts(query: String!): [product]
    singleProduct(id: String!): product
    getAllProducts: [product]
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

  scalar JSON

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
