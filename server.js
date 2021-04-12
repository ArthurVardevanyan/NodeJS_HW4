require('dotenv').config();

const Mongoose = require('mongoose');

const Express = require('express');

const app = Express();

app.use(Express.json());

const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 8080;
const Service = require('./services/service');

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  socket.on('typingInput', async (msg) => {
    socket.emit('typingInput', await Service.getStartsWith(msg));
  });
  socket.on('Input', async (msg) => {
    socket.emit(await Service.post({ text: msg }));
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
