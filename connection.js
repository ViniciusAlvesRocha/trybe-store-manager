const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

module.exports = () => 
MongoClient.connect(MONGO_DB_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then((conn) => conn.db(DB_NAME))
.catch((error) => {
console.error(error);
process.exit(1);
}); 