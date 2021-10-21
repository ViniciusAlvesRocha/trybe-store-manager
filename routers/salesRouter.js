const express = require('express');

const router = express.Router();

const controllerSales = require('../controllers/Sale');

router.post('/',
controllerSales.validateProductIdAndQuantity, controllerSales.create);

router.get('/:id', controllerSales.getSaleById);

router.get('/', controllerSales.listAll);

module.exports = router;
