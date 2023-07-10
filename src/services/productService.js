const { apiRoot } = require("../ctpClient");
const { adminApp, firebaseAuth } = require("../firebaseConfig");
const { authClient } = require("../config");

/**
 * Service for getting all products.
 * @param {string} query - The query string.
 * @returns {Promise} - Resolves to the fetched products.
 */
const getallProducts = async (query) => {
  try {
    const detail = await apiRoot.productProjections().get({}).execute();
    console.log(detail);

    // Add a unique ID to the masterVariant object within each product
    const productsWithId = detail.body.results.map((product) => ({
      ...product,
      masterVariant: {
        ...product.masterVariant,
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      },
    }));

    return productsWithId;
  } catch (error) {
    throw error;
  }
};

/**
 * Service for getting searched products.
 * @param {string} query - The search query.
 * @returns {Promise} - Resolves to the searched products.
 */
const getSearchedProduct = async (query) => {
  console.log("q", query);
  try {
    const detail = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          [`text.en`]: query,
        },
      })
      .execute();
    console.log(detail);

    // Add a unique ID to the masterVariant object within each product
    const productsWithId = detail.body.results.map((product) => ({
      ...product,
      masterVariant: {
        ...product.masterVariant,
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      },
    }));

    return productsWithId;
  } catch (error) {
    throw error;
  }
};

/**
 * Service for getting a single product by ID.
 * @param {string} id - The ID of the product.
 * @returns {Promise} - Resolves to the fetched product.
 */
const getProduct = async (id) => {
  try {
    const prod = await apiRoot
      .productProjections()
      .withId({ ID: id })
      .get({})
      .execute();
    return prod.body;
  } catch (error) {
    throw error;
  }
};

/**
 * Service for getting search suggestions.
 * @param {string} term - The search term.
 * @returns {Promise} - Resolves to the search suggestions.
 */
const getSuggesion = async (term) => {
  try {
    const suggesion = await apiRoot
      .productProjections()
      .suggest()
      .get({
        queryArgs: {
          [`searchKeywords.en`]: term,
          fuzzy: true,
        },
      })
      .execute();
    console.log(suggesion.body["searchKeywords.en"]);
    return suggesion.body["searchKeywords.en"];
  } catch (error) {
    throw error;
  }
};



module.exports = {
  getProduct,
  getSearchedProduct,
  getallProducts,
  getSuggesion,
 
};
