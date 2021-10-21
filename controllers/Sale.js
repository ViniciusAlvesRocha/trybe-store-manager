const Sale = require('../services/Sale');
const modelSales = require('../models/Sale');

const verifyProductExists = async (req, res, next) => {
  const { name } = req.body;
  if (await Sale.verifyProductExists(name)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

const validateProductIdAndQuantity = (req, res, next) => {
  const sales = req.body;
  console.log(sales);
  sales.forEach(({ productId, quantity }) => {
    console.log(productId, quantity);
    Sale.validateProductIdAndQuantity(res, productId, quantity);
  });
  next();
};

/* { "productId": "sakjdhfksajhdfshdfkjsadf", "quantity": 20 },
  { "productId": "iwydepqwfjesfkffkfkkfkfk", "quantity": 30 }
*/

const create = async (req, res) => {
  const sales = req.body;
  const insertedSalesId = await modelSales.create(sales);
  return res.status(200).json({
    _id: insertedSalesId,
    itensSold: sales,
  });
};

/*
const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await modelProducts.update(id, name, quantity);
  res.status(200).json(product.value);
};

const listAll = async (_req, res) => {
  console.log('dentro de listAll');
  const products = await modelProducts.listAll();
  console.log(products);
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await modelProducts.getProductById(id);
  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  res.status(200).json(product);
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  Product.validateId(res, id);
  next();
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.deleteProduct(id, res);
};
*/

module.exports = {
  create,
  validateProductIdAndQuantity,
  verifyProductExists,
  // listAll,
  // getProductById,
  // update,
  // deleteProduct,
  // validateId,
};