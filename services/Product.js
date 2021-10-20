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

const validateId = (res, id) => {
  if (id.length < 16) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

const deleteProduct = async (id, res) => {
  if (!await Product.deleteProduct(id)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        messege: 'Worng id format',
      },
  });
  }
  res.status(200).json();
};

module.exports = {
  create,
  validateName,
  verifyProductExists,
  validateQuantify,
  varifyQuantifyIsNumber,
  deleteProduct,
  validateId,
};