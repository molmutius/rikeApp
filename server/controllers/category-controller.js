var Category = require('../models/category');

// only adds a category, if <= 7
module.exports.add = function (req, res) {
  Category.find({}, function (err, results) {
    if (err) console.log(err);
    if (results.length <= 7) {
      var category = new Category(req.body);
      category.save(function (err, result) {
        if (err) console.log(err);
        res.json(result);
      });
    } else {
      res.json({ tooManyCatsMessage: "Es sind insgesamt nur 8 Kategorien erlaubt."});
    }
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