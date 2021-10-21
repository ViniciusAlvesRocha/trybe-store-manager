const modelSales = require('../models/Sale');

const validateProductIdAndQuantity = (res, productId, quantity) => {
  console.log('Service', productId);
  if (productId.length < 16 || typeof quantity !== 'number' || quantity <= 0) return false;
  return true;
};

const listAll = () => modelSales.listAll();

const getSaleById = async (idsale) => {
  const sale = await modelSales.getSaleById(idsale);
  if (!sale) {
    return ({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  return sale;
};

module.exports = {
  validateProductIdAndQuantity,
  listAll,
  getSaleById,
};
