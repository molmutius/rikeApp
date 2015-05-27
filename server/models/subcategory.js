var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subcategorySchema = Schema({
	name: String,
	ubercategory: { type: String, ref: 'Category' },
	preview: String,
});

module.exports = mongoose.model('Subcategory', subcategorySchema);
