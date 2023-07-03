const { apiRoot } = require("../ctpClient");

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

module.exports = { getProduct, getSearchedProduct, getallProducts };
