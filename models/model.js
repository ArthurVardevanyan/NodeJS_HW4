const Mongoose = require('mongoose');

module.exports = Mongoose.model('Autofill', new Mongoose.Schema({
  name: { type: String, required: true },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
