//services import
const {
  getProduct,
  getSearchedProduct,
  getallProducts,
  getSuggesion,
  phoneNumberLogin,
  userSignupCT,
  checkifUserExists,
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

    phoneLogin: async (parent, { id }) => {
      try {
        const data = await phoneNumberLogin(id);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    signupUserCT: async (parent, { token }) => {
      try {
        const data = await userSignupCT(token);
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
