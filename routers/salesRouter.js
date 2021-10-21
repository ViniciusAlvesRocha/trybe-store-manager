const express = require('express');

const router = express.Router();

const controllerSales = require('../controllers/Sale');

router.post('/',
controllerSales.validateProductIdAndQuantity, controllerSales.create);
  // controllerSales.validateProductIdAndQuantity,
  // controllerSales.create);

module.exports = router;
