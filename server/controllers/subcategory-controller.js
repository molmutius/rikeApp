var Category = require('../models/subcategory');

// only adds a category, if <= 7
module.exports.addSubcategotery = function (req, res) {
  Category.find({}, function (err, results) {
    if (err) console.log(err);
    var category = new Category(req.body);
    category.save(function (err, result) {
      if (err) console.log(err);
      res.json(result);
    });
  });
}

module.exports.listSubcategories = function (req, res) {
  Category.find({ubercategory: req.params.ubercat}, function (err, results) {
    if (err) console.log(err);
    res.json(results);
  });
}

module.exports.delete = function (req, res) {
  Category.findByIdAndRemove(req.params.id, req.body, function (err, result) {
    if (err) console.log(err);
    res.json(result);
  });
}

module.exports.getSingleSubcategory = function (req, res) {
  Category.findOne({name: req.params.name }, function (err, result) {
    if (err) console.log(err)
    res.json(result);
  });
}

module.exports.updatePreview = function (req, res) {
  Category.update({ name: req.params.name }, { $set: { preview: req.body.preview }}).exec();
}