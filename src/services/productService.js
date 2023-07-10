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

/**
 * Service for getting a token.
 * @param {string} id - The ID used to generate the token.
 * @returns {Promise} - Resolves to the generated token.
 */
const getToken = async (id) => {
  try {
    const userResponse = await adminApp.auth().verifyIdToken(id);
    console.log(userResponse);
    const token = await authClient.customerPasswordFlow(
      {
        username: userResponse.email,
        password: userResponse.email,
      },
      {
        disableRefreshToken: false,
      }
    );
    console.log(token.access_token);
    return token.access_token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Service for user signup using a token.
 * @param {string} token - The signup token.
 * @returns {Promise} - Resolves to the user data after signup.
 */
const userSignupCT = async (token) => {
  try {
    const details = await firebaseAuth.verifyIdToken(token);
    const newCustomerDetails = {
      firstName: details.name,
      email: details.email,
      password: details.email,
      custom: {
        type: {
          key: "customerPhoneNumber",
          typeId: "type",
        },
        fields: {
          phoneNumber: {
            en: details.phone_number,
          },
        },
      },
    };

    // Post the CustomerDraft and get the new Customer
    const response = await apiRoot
      .me()
      .signup()
      .post({ body: newCustomerDetails })
      .execute();
    return response.body.customer;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Service for checking if a user exists.
 * @param {string} email - The email of the user.
 * @param {string} phoneNumber - The phone number of the user.
 * @returns {Promise} - Resolves to an object indicating whether the user exists or not.
 */
const checkifUserExists = async (email, phoneNumber) => {
  console.log(email);
  try {
    const userByMail = await firebaseAuth.getUserByEmail(email);
    if (userByMail) {
      console.log(userByMail);
      return { exists: true };
    }
  } catch (error) {
    try {
      const userByPhone = await firebaseAuth.getUserByPhoneNumber(phoneNumber);
      if (userByPhone) {
        console.log(userByPhone);
        return { exists: true };
      }
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        return { exists: false };
      }
    }
  }
};

/**
 * Service for user signup with social media authentication.
 * @param {string} token - The social media signup token.
 * @returns {Promise} - Resolves to the user data after signup.
 */
const userSignUpSocial = async (token) => {
  try {
    const details = await firebaseAuth.verifyIdToken(token);
    console.log(details);
    const newCustomerDetails = {
      firstName: details.name,
      email: details.email,
      password: details.email,
    };

    // const result = await apiRoot
    //   .get({
    //     queryArgs: {
    //       where: { email: details.email },
    //     },
    //   })
    //   .execute();
    // console.log(
    //   "===========================================================",
    //   result
    // );

    // Post the CustomerDraft and get the new Customer
    const response = await apiRoot
      .me()
      .signup()
      .post({ body: newCustomerDetails })
      .execute();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getProduct,
  getSearchedProduct,
  getallProducts,
  getSuggesion,
  getToken,
  userSignupCT,
  checkifUserExists,
  userSignUpSocial,
};
