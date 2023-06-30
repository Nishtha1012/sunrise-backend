const {
  getProductDetailss,
  getProduct,
} = require("../services/productService");

const resolvers = {
  Query: {
    fetchProducts: async () => {
      try {
        const data = await getProductDetailss();
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    singleProduct: async (parent, { id }) => {
      try {
        console.log("id", id);
        const data = await getProduct(id);
        console.log(data);
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
