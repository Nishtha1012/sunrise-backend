// Services import
const {
  getProduct,
  getSearchedProduct,
  getallProducts,
  getSuggesion,
} = require("../services/productService");

const {
  checkifUserExists,
  getToken,
  userSignupCT,
  userSignUpSocial,
} = require("../services/userService");

const resolvers = {
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
  Mutation: {
    /**
     * Check if a user already exists.
     * @param {object} parent - The parent resolver.
     * @param {object} args - The arguments passed to the resolver.
     * @param {string} args.email - The email of the user.
     * @param {string} args.phoneNumber - The phone number of the user.
     * @returns {Promise} - Resolves to the user data if exists, otherwise null.
     */
    checkExisting: async (parent, { email, phoneNumber }) => {
      try {
        const data = await checkifUserExists(email, phoneNumber);
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    /**
     * Get a token and set it as an HTTP-only cookie.
     * @param {object} parent - The parent resolver.
     * @param {object} args - The arguments passed to the resolver.
     * @param {string} args.id - The ID used to generate the token.
     * @param {object} context - The context object containing the request and response.
     * @param {object} context.req - The request object.
     * @param {object} context.res - The response object.
     * @returns {Promise} - Resolves to the generated token.
     */
    getCtToken: async (parent, { id }, { req, res }) => {
      try {
        const data = await getToken(id);
        const cookieOptions = {
          httpOnly: true,
          secure: true,
        };
        res.cookie("Nishtha", data, cookieOptions);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    /**
     * Sign up a user using a token.
     * @param {object} parent - The parent resolver.
     * @param {object} args - The arguments passed to the resolver.
     * @param {string} args.token - The token used for user signup.
     * @returns {Promise} - Resolves to the user data after signup.
     */
    signupUserCT: async (parent, { token }) => {
      try {
        const data = await userSignupCT(token);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    /**
     * Sign up a user with social media authentication.
     * @param {object} parent - The parent resolver.
     * @param {object} args - The arguments passed to the resolver.
     * @param {string} args.token - The token used for social media signup.
     * @returns {Promise} - Resolves to the user data after signup.
     */
    signUpWithSocials: async (parent, { token }) => {
      console.log(token);
      try {
        const data = await userSignUpSocial(token);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

module.exports = {
  resolvers,
};
