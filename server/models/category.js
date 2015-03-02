var mongoose = require('mongoose');

module.exports = mongoose.model('Category', {
  value: String
});