const modelSales = require('../models/Sale');

const validateProductIdAndQuantity = (res, productId, quantity) => {
  console.log('Service', productId);
  if (productId.length < 16 || typeof quantity !== 'number' || quantity <= 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
};

module.exports = {
  validateProductIdAndQuantity,
};
