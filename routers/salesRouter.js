const express = require('express');

const router = express.Router();

const controllerSales = require('../controllers/Sale');

router.post('/',
controllerSales.validateProductIdAndQuantity, controllerSales.create);

router.get('/:id', controllerSales.getSaleById);

router.put('/:id',
  controllerSales.verifyIdAndQuantitySale,
  controllerSales.update);

router.get('/', controllerSales.listAll);

router.delete('/:id', controllerSales.deleteSale);

module.exports = router;
