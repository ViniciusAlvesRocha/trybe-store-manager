const { ObjectId } = require('mongodb');
const connect = require('mongodb');
const connection = require('./connection');

const create = (product) =>
  connection()
    .then((db) => db.collection('products').insertOne(product))
    .then((result) => result.ops[0]);

const getProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const listAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return { products };
};

const getProductById = async (id) => {
  const db = await connection();
  try {
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    console.log(product);
    return product;
  } catch (_e) {
    return false;
  }
};

module.exports = {
  create,
  getProductByName,
  listAll,
  getProductById,
};