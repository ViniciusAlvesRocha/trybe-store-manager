const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (sales) => {
  const db = await connection();
  const register = await db.collection('sales').insertOne({
    itensSold: [
      ...sales,
    ] });

    return register.insertedId;
};

const listAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getSaleById = async (idsale) => {
  const db = await connection();
  try {
    const sale = await db.collection('sales').findOne({ _id: ObjectId(idsale) });
    return sale;
  } catch (_e) {
    return false;
  }
};

module.exports = {
  create,
  listAll,
  getSaleById,
};