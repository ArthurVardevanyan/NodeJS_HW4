require('dotenv').config();

const Mongoose = require('mongoose');

const Express = require('express');

const app = Express();

app.use(Express.json());

const http = require('http').Server(app);
const io = require('socket.io')(http);
require('./socket')(io);

app.use(Express.static(`${__dirname}/public`));

(async () => {
  await Mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  http.listen(8080);
})();

module.exports = app;
