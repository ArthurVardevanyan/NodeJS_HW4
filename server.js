require('dotenv').config();

const Mongoose = require('mongoose');

const Express = require('express');

const app = Express();

app.use(Express.json());

const Route = require('./routes/route');

app.use('/', Route);

(async () => {
  await Mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();

module.exports = app;
