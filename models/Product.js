// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (product) =>
  connection()
    .then((db) => db.collection('products').insertOne(product))
    .then((result) => result.ops[0]);

const getProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  // if (!product) return null;
  // console.log(product);
  return product;
};

module.exports = {
  create,
  getProductByName,
};