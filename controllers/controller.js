const { StatusCodes } = require('http-status-codes');

exports.OK = (req, res) => {
  res.status(StatusCodes.OK).send('Hello World');
};
