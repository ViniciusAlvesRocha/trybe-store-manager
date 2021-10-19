const express = require('express');

const productsRouter = express.Router();
const Product = require('../controllers/Product');

productsRouter.post('/',
  Product.validateName,
  Product.validateQuantify,
  Product.verifyProductExists,
  Product.create);

module.exports = productsRouter;