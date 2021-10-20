const express = require('express');

const productsRouter = express.Router();
const Product = require('../controllers/Product');

productsRouter.get('/:id', Product.getProductById);

productsRouter.get('/', Product.listAll);

productsRouter.post('/',
  Product.validateName,
  Product.validateQuantify,
  Product.verifyProductExists,
  Product.create);

productsRouter.put('/:id',
  Product.validateName,
  Product.validateQuantify,
  Product.update);

module.exports = productsRouter;