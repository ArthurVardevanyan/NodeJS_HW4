const escapeStringRegexp = require('escape-string-regexp');
const sanitize = require('mongo-sanitize');

const Model = require('../models/model');

exports.getAll = async (query) => Model.find(query).select('-_id -__v');
exports.getStartsWith = async (query) => Model.find({ text: new RegExp(`^${escapeStringRegexp(query)}`) }).select('-_id -__v');
exports.post = async (body) => new Model(sanitize(body)).save();
exports.deleteAll = async () => (await Model.deleteMany()).deletedCount;
