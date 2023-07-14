// Services import

const {
  createCart,
  getCart,
  addToCart,
  removeCartProduct,
  addEmail,
  addShipping,
} = require("../services/cartServices");

const cartResolver = {
  Query: {
    /**
     * Fetch all products.
     * @returns {Promise} - Resolves to all the products.
     */
    getCartProducts: async (parent, { cartId }) => {
      try {
        const result = await getCart(cartId);
        console.log(result);
        return result.body;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createGeneralCart: async (parent, { cartId }) => {
      console.log(cartId);
      if (cartId === null) {
        console.log("here");
        try {
          const result = await createCart(cartId);
          console.log(result);
          return result.body;
        } catch (error) {
          console.log(error);
          return error;
        }
      } else {
        return { exists: true };
      }
    },

    addProductToCart: async (parent, { cartInput }) => {
      console.log(cartInput, "=============================");
      try {
        const result = await addToCart(
          cartInput.cartId,
          cartInput.cartVersion,
          cartInput.productId
        );
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    removeFromCart: async (parent, { cartInput }) => {
      console.log(cartInput, "=============================");
      try {
        const result = await removeCartProduct(
          cartInput.cartId,
          cartInput.cartVersion,
          cartInput.productId
        );
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    addCustomerEmail: async (parent, { input }) => {
      try {
        const result = await addEmail(
          input.cartId,
          input.cartVersion,
          input.email
        );
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    addShippingAddress: async (parent, { shippingInput }) => {
      console.log(
        shippingInput,
        "================================================="
      );
      try {
        const result = await addShipping(
          shippingInput.cartId,
          shippingInput.cartVersion,
          shippingInput.firstName,
          shippingInput.lastName,
          shippingInput.streetName,
          shippingInput.country,
          shippingInput.city,
          shippingInput.postalCode,
          shippingInput.phone
        );
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

module.exports = {
  cartResolver,
};
