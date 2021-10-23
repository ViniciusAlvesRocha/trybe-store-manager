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

const verifyIdAndQuantitySale = (req, res, next) => {
  const [sale] = req.body;
  console.log(sale);
  const idAndQuantityValidated = Sale.verifyIdAndQuantitySale(sale);
  console.log(idAndQuantityValidated);
 
  if (idAndQuantityValidated.err) return res.status(422).json(idAndQuantityValidated);
  next();
};

const update = async (req, res) => {
  const { id } = req.params;
  const [sale] = req.body;
  const saleUpdated = await Sale.update(id, sale);
  console.log(saleUpdated);
  if (saleUpdated.err) return res.status(422).json(saleUpdated);
  res.status(200).json(saleUpdated);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sale = await Sale.getSaleById(id);
  const deletedSale = await Sale.deleteSale(id);
  return deletedSale.err
   ? res.status(422).json(deletedSale)
   : res.status(200).json(sale);
};

module.exports = {
  create,
  validateProductIdAndQuantity,
  verifyProductExists,
  listAll,
  getSaleById,
  update,
  verifyIdAndQuantitySale,
  deleteSale,
};