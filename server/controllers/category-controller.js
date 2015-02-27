var Category = require('../models/category');

module.exports.add = function (req, res) {
  var category = new Category(req.body);
  category.save(function (err, result) {
    if (err) console.log(err);
    res.json(result);
  });
}

module.exports.list = function (req, res) {
  Category.find({}, function (err, results) {
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