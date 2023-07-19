// Services import
const crypto = require("crypto");

const {
  checkifUserExists,
  getToken,
  userSignupCT,
  userSignUpSocial,
  getTokenSocials,
  tokenVerification,
} = require("../services/userService");

const userResolver = {
  Query: {
    verifyToken: async (parent, args, { req, res }) => {
      try {
        let cookie = req.cookies.AuthToken;
        console.log(cookie);
        let customerDetail = await tokenVerification(cookie);
        return { user: customerDetail?.body.firstName };
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
          sameSite: "None",
        };
        res.cookie("AuthToken", data, cookieOptions);
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
    signUpWithSocials: async (parent, { token }, { req, res }) => {
      try {
        const data = await userSignUpSocial(token);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    getSocialToken: async (parent, { id }, { req, res }) => {
      console.log(id, "id");
      try {
        const data = await getTokenSocials(id);
        const cookieOptions = {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        };
        res.cookie("AuthToken", data, cookieOptions);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    encryptPassword: async (parent, { password }) => {
      function encryptPassword(password) {
        const md5sum = crypto.createHash("md5");
        const encryptedPassword = md5sum.update(password).digest("hex");
        return encryptedPassword;
      }
      try {
        const encryptedPassword = encryptPassword(password);
        console.log(encryptedPassword);
        return encryptPassword;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

module.exports = {
  userResolver,
};
