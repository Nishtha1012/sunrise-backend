const { apiRoot } = require("../ctpClient");
const { adminApp, firebaseAuth } = require("../firebaseConfig");
const { authClient } = require("../config");
const { encryptPassword } = require("../utils/encrypt");

/**
 * Service for getting a token.
 * @param {string} id - The ID used to generate the token.
 * @returns {Promise} - Resolves to the generated token.
 */
const getToken = async (id) => {
  try {
    const userResponse = await adminApp.auth().verifyIdToken(id);
    console.log(userResponse);
    const hasedPassword = await encryptPassword(userResponse.email);
    const token = await authClient.customerPasswordFlow(
      {
        username: userResponse.email,
        password: hasedPassword,
      },
      {
        disableRefreshToken: false,
      }
    );
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
    const hasedPassword = await encryptPassword(details.email);
    console.log(hasedPassword, "password");
    const newCustomerDetails = {
      firstName: details.name,
      email: details.email,
      password: hasedPassword,
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
  const { uid } = await firebaseAuth.verifyIdToken(token);
  const details = await firebaseAuth.getUser(uid);
  try {
    console.log(details, "detailss");

    const users = await firebaseAuth.getUserByEmail(
      details.providerData[0].email
    );
    if (users.providerData.length > 1) {
      console.log("Existsss");
      const deleted = await firebaseAuth.deleteUser(uid);
      return true;
    }
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      const data = await firebaseAuth.updateUser(uid, {
        email: details.providerData[0].email,
      });

      const hasedPassword = await encryptPassword(
        details.providerData[0].email
      );

      // Post the CustomerDraft and get the new Customer
      const newCustomerDetails = {
        firstName: details.providerData[0].displayName,
        email: details.providerData[0].email,
        password: hasedPassword,
      };
      const response = await apiRoot
        .me()
        .signup()
        .post({ body: newCustomerDetails })
        .execute();
      console.log(response);
      return response;
    }
    console.log(error, "error");
    return error;
  }
};

const getTokenSocials = async (id) => {
  try {
    const { uid } = await adminApp.auth().verifyIdToken(id);
    const user = await firebaseAuth.getUser(uid);
    const hasedPassword = await encryptPassword(user.providerData[0].email);
    const token = await authClient.customerPasswordFlow(
      {
        username: user.providerData[0].email,
        password: hasedPassword,
      },
      {
        disableRefreshToken: false,
      }
    );
    return token.access_token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const tokenVerification = async (token) => {
  try {
    let customerDetail = await apiRoot
      .me()
      .get({ headers: { Authorization: `Bearer ${token}` } })
      .execute();
    return customerDetail;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getToken,
  userSignupCT,
  checkifUserExists,
  userSignUpSocial,
  getTokenSocials,
  tokenVerification,
};
