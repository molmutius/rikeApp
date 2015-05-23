var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subcategorySchema = Schema({
	ubercategory: { type: String, ref: 'Category'},
	name: String
});

module.exports = mongoose.model('Subcategory', subcategorySchema);
