const { apiRoot } = require("../ctpClient");
const { adminApp, firebaseAuth } = require("../firebaseConfig");
const { getAuth } = require("firebase/auth");

//service for getting all products
const getallProducts = async (query) => {
  console.log("q", query);
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

//get searched products
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

//service for getting single product by id
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

const phoneNumberLogin = async (id) => {
  try {
    const userResponse = await adminApp.auth().verifyIdToken(id);

    return userResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const userSignupCT = async (
  email,
  password,
  phoneNumber,
  firstname,
  lastname
) => {
  try {
    const newCustomerDetails = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      custom: {
        type: {
          key: "customerPhoneNumber",
          typeId: "type",
        },
        fields: {
          phoneNumber: {
            en: phoneNumber,
          },
        },
      },
    };

    // Post the CustomerDraft and get the new Customer
    const response = await apiRoot
      .customers()
      .post({ body: newCustomerDetails })
      .execute();
    return response.body.customer;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const checkifUserExists = async (email, phoneNumber) => {
  try {
    const userByMail = await firebaseAuth.getUserByEmail(email);
    if (userByMail) {
      console.log(userByMail);
      return { exists: true };
    }
  } catch (error) {
    console.log(error);
    try {
      const userByPhone = await firebaseAuth.getUserByPhoneNumber(phoneNumber);
      if (userByPhone) {
        console.log(userByPhone);
        return { exists: true };
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return { exists: false };
      }
    }
  }
};

module.exports = {
  getProduct,
  getSearchedProduct,
  getallProducts,
  getSuggesion,
  phoneNumberLogin,
  userSignupCT,
  checkifUserExists,
};
