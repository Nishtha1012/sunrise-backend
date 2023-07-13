const { apiRoot } = require("../ctpClient");

const getCart = async (cartId) => {
  console.log(cartId, "cartID===================================");
  try {
    const result = await apiRoot.carts().withId({ ID: cartId }).get().execute();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createCart = async (cartId) => {
  console.log(cartId, "cartID===================================");
  try {
    const result = await apiRoot
      .carts()
      .post({
        body: {
          currency: "EUR",
        },
      })
      .execute();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addToCart = async (cartId, cartVersion, productId) => {
  console.log(cartId, "==================================");
  console.log(cartVersion, "==================================");
  console.log(productId, "==================================");

  try {
    const result = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: parseInt(cartVersion),
          actions: [
            {
              action: "addLineItem",
              productId: productId,
              variantId: 1,
            },
          ],
        },
      })
      .execute();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  createCart,
  addToCart,
  getCart,
};
