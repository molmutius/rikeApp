var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = Schema({
	value: String
});

module.exports = mongoose.model('Category', categorySchema);