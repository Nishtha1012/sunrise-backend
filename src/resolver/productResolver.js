//services import
const {
  getProductDetailss,
  getProduct,
} = require("../services/productService");

const resolvers = {
  Query: {
    // to fetch all products
    fetchProducts: async () => {
      try {
        const data = await getProductDetailss();
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
  },
};

module.exports = {
  resolvers,
};
