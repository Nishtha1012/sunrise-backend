// Services import
const { apiRoot } = require("../ctpClient");
const {
  getProduct,
  getSearchedProduct,
  getallProducts,
  getSuggesion,
} = require("../services/productService");

const productResolver = {
  Query: {
    /**
     * Fetch products based on a query.
     * @param {object} parent - The parent resolver.
     * @param {object} args - The arguments passed to the resolver.
     * @param {string} args.query - The query string.
     * @returns {Promise} - Resolves to the fetched products.
     */
    fetchProducts: async (parent, { query }) => {
      try {
        const data = await getSearchedProduct(query);
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    /**
     * Fetch a single product by ID.
     * @param {object} parent - The parent resolver.
     * @param {object} args - The arguments passed to the resolver.
     * @param {string} args.id - The ID of the product.
     * @returns {Promise} - Resolves to the fetched product.
     */
    singleProduct: async (parent, { id }) => {
      try {
        const data = await getProduct(id);
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    /**
     * Fetch all products.
     * @returns {Promise} - Resolves to all the products.
     */
    getAllProducts: async () => {
      console.log("here");
      try {
        const data = await getallProducts();
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    /**
     * Get search suggestions based on a search term.
     * @param {object} parent - The parent resolver.
     * @param {object} args - The arguments passed to the resolver.
     * @param {string} args.term - The search term.
     * @returns {Promise} - Resolves to the search suggestions.
     */
    getSearchSuggesion: async (parent, { term }) => {
      try {
        const data = await getSuggesion(term);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

module.exports = {
  productResolver,
};
