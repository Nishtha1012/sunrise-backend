const express = require("express");
const { getProductDetails } = require("../controller/product");

const router = express.Router();

router.get("/", getProductDetails);

module.exports = { router };
