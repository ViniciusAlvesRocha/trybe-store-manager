const Product = require('../services/Product');

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!Product.validateName(name)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
};

const verifyProductExists = async (req, res, next) => {
  const { name } = req.body;
  if (await Product.verifyProductExists(name)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

const validateQuantify = (req, res, next) => {
  const { quantity } = req.body;
  if (!Product.validateQuantify(parseInt(quantity, 10))) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  if (!Product.varifyQuantifyIsNumber(quantity)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  next();
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  await Product.create({
      name,
      quantity,
  }).then((result) => res.status(201).json(result));
};

module.exports = {
  create,
  validateName,
  verifyProductExists,
  validateQuantify,
};