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

const createCart = async () => {
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
    return result.body;
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

const addBilling = async (
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
    console.log(firstName, "------------------------------------");
    const result = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: parseInt(cartVersion),
          actions: [
            {
              action: "setBillingAddress",
              address: {
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

const addShipMethod = async (methodId, cartId, cartVersion) => {
  try {
    const result = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: parseInt(cartVersion),
          actions: [
            {
              action: "setShippingMethod",
              shippingMethod: {
                id: methodId,
                typeId: "shipping-method",
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

const generateOrder = async (cartId, cartVersion) => {
  try {
    const result = await apiRoot
      .orders()
      .post({
        body: {
          cart: {
            id: cartId,
          },
          version: parseInt(cartVersion),
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

const fetchOrderByEmail = async (email, customerId) => {
  try {
    const { body } = await apiRoot
      .orders()
      .get({
        queryArgs: {
          where: `customerEmail="${email}"`,
        },
      })
      .execute();

    const orders = await addCustomerIdToOrder(body.results, customerId);
    console.log(orders, "---------------------------------------------");
    return orders;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addCustomerIdToOrder = async (orderList, customerId) => {
  try {
    const orders = await Promise.all(
      orderList.map(async (order) => {
        const addEmail = await apiRoot
          .orders()
          .withId({ ID: order.id })
          .post({
            body: {
              version: parseInt(order.version),
              actions: [
                {
                  action: "setCustomerId",
                  customerId,
                },
              ],
            },
          })
          .execute();
        console.log(addEmail, "addemail");
        return addEmail;
      })
    );
    return orders;
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
  addBilling,
  addShipMethod,
  generateOrder,
  fetchOrderByEmail,
};
