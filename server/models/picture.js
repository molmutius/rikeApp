var mongoose = require('mongoose');

module.exports = mongoose.model('Picture', {
  caption: String,
  url: String,
  category: { type: String, ref: 'Category'},
  subcategory: { type: String, ref: 'Subcategory'},
  isPreview: Boolean,
});