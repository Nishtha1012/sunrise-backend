// Services import

const {
  createCart,
  getCart,
  addToCart,
  removeCartProduct,
  addEmail,
  addShipping,
  addBilling,
  addShipMethod,
  generateOrder,
  fetchOrderByEmail,
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

    fetchOrders: async (poaernt, { Email }) => {
      try {
        const result = await fetchOrderByEmail(Email);
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
  Mutation: {
    createGeneralCart: async (parent, { cartId }) => {
      if (cartId === null) {
        console.log("here");
        try {
          const result = await createCart();
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

    addBillingAddress: async (parent, { billingInput }) => {
      console.log(billingInput, "/////////////////");
      try {
        const result = await addBilling(
          billingInput.cartId,
          billingInput.cartVersion,
          billingInput.firstName,
          billingInput.lastName,
          billingInput.streetName,
          billingInput.country,
          billingInput.city,
          billingInput.postalCode,
          billingInput.phone
        );
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    addShippingMethod: async (parent, { shippingMethodInput }) => {
      try {
        const result = await addShipMethod(
          shippingMethodInput.methodId,
          shippingMethodInput.cartId,
          shippingMethodInput.cartVersion
        );
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    createOrder: async (parent, { orderInput }) => {
      console.log(orderInput);
      try {
        const result = await generateOrder(
          orderInput.cartId,
          orderInput.cartVersion
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
