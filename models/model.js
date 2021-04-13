const Mongoose = require('mongoose');

module.exports = Mongoose.model('Autofill', new Mongoose.Schema({
  Name: { type: String, required: true, unique: true },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
