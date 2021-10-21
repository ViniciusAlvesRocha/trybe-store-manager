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
  let verify = null;
  sales.forEach(({ productId, quantity }) => {
    // console.log(productId, quantity);
    verify = Sale.validateProductIdAndQuantity(res, productId, quantity);
  });
  console.log(verify);
  if (!verify) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

const create = async (req, res) => {
  const sales = req.body;
  const insertedSalesId = await modelSales.create(sales);
  return res.status(200).json({
    _id: insertedSalesId,
    itensSold: sales,
  });
};

const listAll = async (_req, res) => {
  const sales = await Sale.listAll();
  res.status(200).json({
    sales: [
      ...sales,
    ],
  });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await Sale.getSaleById(id);
  if (sale.err) {
    return res.status(404).json(sale);
  }
  res.status(200).json(sale);
};

/*
const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await modelProducts.update(id, name, quantity);
  res.status(200).json(product.value);
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
  listAll,
  getSaleById,
  // update,
  // deleteProduct,
  // validateId,
};