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

const verifyIdAndQuantitySale = ({ productId, quantity }) => {
  if (productId.length < 16 || quantity <= 0 || typeof quantity !== 'number') {
    return ({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return true;
};

const update = async (id, sale) => {
  const saleUpdated = await modelSales.update(id, sale);
  if (!saleUpdated) {
    return ({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return saleUpdated;
};

module.exports = {
  validateProductIdAndQuantity,
  listAll,
  getSaleById,
  verifyIdAndQuantitySale,
  update,
};
