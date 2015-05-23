var mongoose = require('mongoose');

module.exports = mongoose.model('Picture', {
  caption: String,
  url: String,
  category: String,
  subcategory: String,
});