var Picture = require('../models/picture');
var multiparty = require('multiparty');
var filesystem = require('fs');

module.exports.add = function (req, res) {
  var picture = new Picture(req.body);
  picture.save(function (err, result) {
    if (err) console.log(err);
    res.json(result);
  });
}

module.exports.list = function (req, res) {
  Picture.find({}, function (err, results) {
    if (err) console.log(err);
    res.json(results);
  });
}

module.exports.delete = function (req, res) {
  Picture.findByIdAndRemove(req.params.id, req.body, function (err, result) {

    var path = '';
    if (process.env.PORT) {
      path = '/../../uploads/'; // clound9
    } else {
      path = '../../../uploads/'; // dev
    }    

    if (err) console.log(err);
    if (result) {
      filesystem.unlink( __dirname + path + result.url, function (err) {
        if (err) console.log(err);
      });
    }
    res.json(result);
  });
}

module.exports.upload = function (req, res) {
  var form = new multiparty.Form({ uploadDir : __dirname + '../../../uploads/' });
  form.parse(req, function(err, fields, files) {
    if (err) console.log(err);
    res.json(files);
  });
}