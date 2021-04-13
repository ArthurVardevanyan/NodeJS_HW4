// https://stackoverflow.com/a/65002874
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const mongoDB = new MongoMemoryServer();
mongoose.connection.close();

module.exports.connect = async () => {
  await mongoose.connection.close();
  const uri = await mongoDB.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};
