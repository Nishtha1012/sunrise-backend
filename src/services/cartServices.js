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
  console.log(cartId, "cartID------------------------");
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

const addToCart = async (cartId, cartVersion = 1, productId) => {
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
    return result.body;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const removeCartProduct = async (cartId, cartVersion, productId) => {
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
              action: "removeLineItem",
              lineItemId: productId,
              quantity: 1,
            },
          ],
        },
      })
      .execute();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return { deleted: false };
  }
};

const addEmail = async (cartId, cartVersion, email) => {
  try {
    const result = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: parseInt(cartVersion),
          actions: [
            {
              action: "setCustomerEmail",
              email: email,
            },
          ],
        },
      })
      .execute();
    console.log(result);
    return { result, added: true };
  } catch (error) {
    console.log(error);
    return { deleted: false };
  }
};

const addShipping = async (
  cartId,
  cartVersion,
  firstName,
  lastName,
  streetName,
  country,
  city,
  postalCode,
  phone
) => {
  try {
    const result = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: parseInt(cartVersion),
          actions: [
            {
              action: "setShippingAddress",
              address: {
                key: "address1",
                firstName,
                lastName,
                streetName,
                country: "DE",
                city,
                postalCode,
                phone,
              },
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
  removeCartProduct,
  addEmail,
  addShipping,
};
