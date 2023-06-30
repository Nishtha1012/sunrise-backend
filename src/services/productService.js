const { apiRoot } = require("../ctpClient");

const getProductDetailss = async () => {
  try {
    const detail = await apiRoot.productProjections().get({}).execute();

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
    return error;
  }
};

const getProduct = async (id) => {
  try {
    const prod = await apiRoot
      .productProjections()
      .withId({ ID: id })
      .get({})
      .execute();
    return prod.body;
  } catch (error) {
    return error;
  }
};

module.exports = { getProductDetailss, getProduct };
