const escapeStringRegexp = require('escape-string-regexp');
const sanitize = require('mongo-sanitize');

const Model = require('../models/model');

exports.getStartsWith = async (query) => {
  const escaped = escapeStringRegexp(query);
  const Regex = new RegExp(`^.*${escaped}`);
  return Model.find({ Name: Regex }).select('-_id -__v');
};
exports.submit = async (str) => {
  const sanitized = sanitize(str);
  return new Model({ Name: sanitized }).save();
};
exports.deleteAll = async () => (await Model.deleteMany()).deletedCount;
exports.deleteString = async (str) => (await Model.deleteOne({ Name: str })).deletedCount;
