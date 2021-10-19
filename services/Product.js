const Product = require('../models/Product');

const validateName = (name) => {
  if (name.length < 5 || typeof (name) !== 'string') return false;
  return true;
};

const verifyProductExists = async (name) => {
  const product = await Product.getProductByName(name);
  // console.log('service', product);
  if (product) return true;
  return false;
};

const validateQuantify = (quantity) => {
  if (quantity < 1) return false;
  return true;
};

const varifyQuantifyIsNumber = (quantity) => {
  if (typeof (quantity) !== 'number') return false;
  return true;
};

const create = (product) => Product.create(product);

module.exports = {
  create,
  validateName,
  verifyProductExists,
  validateQuantify,
  varifyQuantifyIsNumber,
};