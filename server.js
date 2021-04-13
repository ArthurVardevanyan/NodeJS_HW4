require('dotenv').config();

const Mongoose = require('mongoose');

const Express = require('express');

const app = Express();

app.use(Express.json());

const http = require('http').Server(app);
const io = require('socket.io')(http);
const xss = require('xss');

const port = 8080;
const Service = require('./services/service');

app.use(Express.static(`${__dirname}/web`));

io.on('connection', (socket) => {
  socket.on('typingInput', async (msg) => {
    const searchStrings = await Service.getStartsWith(msg);
    const sanitizedSearchStrings = [];
    searchStrings.forEach((str) => {
      sanitizedSearchStrings.push({ text: xss(str.text) });
    });
    socket.emit('typingInput', sanitizedSearchStrings);
  });
  socket.on('Input', async (msg) => {
    let input = '';
    try {
      input = await Service.post({ text: xss(msg) });
    } catch (e) {
      if (e.code !== 11000) {
        throw e;
      }
    }
    socket.emit(input);
  });
});

(async () => {
  await Mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  http.listen(port);
})();

module.exports = app;
