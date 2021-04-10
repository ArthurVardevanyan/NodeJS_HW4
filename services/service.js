const Model = require('../models/model');

exports.getAll = async (query) => Model.find(query).select('-_id -__v');
exports.getStartsWith = async (query) => Model.find({ text: new RegExp(`^${query}`) }).select('-_id -__v');
exports.post = async (body) => new Model(body).save();
exports.deleteAll = async () => (await Model.deleteMany()).deletedCount;
