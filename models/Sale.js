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

module.exports = {
  create,
};