const xss = require('xss');

const Service = require('./services/service');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('typingInput', async (inputString) => {
      const searchStrings = await Service.getStartsWith(inputString);
      const sanitizedSearchStrings = [];
      searchStrings.forEach((str) => {
        sanitizedSearchStrings.push({ Name: xss(str.Name) });
      });
      socket.emit('typingInput', sanitizedSearchStrings);
    });

    socket.on('Input', async (inputString) => {
      let input = null;
      const duplicate = await Service.deleteString(xss(inputString));
      input = await Service.submit(xss(inputString));
      if (duplicate !== 0) { socket.emit('Input', null); }
      socket.emit('Input', input.Name);
    });

    socket.on('clear', async () => {
      socket.emit('clear', await Service.deleteAll());
    });

    socket.on('del', async (inputString) => {
      socket.emit('del', await Service.deleteString(xss(inputString)));
    });
  });
};
