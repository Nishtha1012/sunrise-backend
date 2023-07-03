//services import
const {
  getProduct,
  getSearchedProduct,
  getallProducts,
} = require("../services/productService");

const resolvers = {
  Query: {
    // to fetch all products
    fetchProducts: async (parent, { query }) => {
      try {
        const data = await getSearchedProduct(query);
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    // to fetch one product by id
    singleProduct: async (parent, { id }) => {
      try {
        const data = await getProduct(id);
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    getAllProducts: async () => {
      try {
        const data = await getallProducts();
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
};

module.exports = {
  resolvers,
};
