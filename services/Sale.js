const modelSales = require('../models/Sale');

const validateProductIdAndQuantity = (res, productId, quantity) => {
  console.log('Service', productId);
  if (productId.length < 16 || typeof quantity !== 'number' || quantity <= 0) return false;
  return true;
};

module.exports = {
  validateProductIdAndQuantity,
};
