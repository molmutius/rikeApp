var Picture = require('../models/picture');
var multiparty = require('multiparty');
var filesystem = require('fs');
var lwip = require('lwip');
var path = require('path');

var path = __dirname + '/../../uploads/';
var thumbs = '/thumbs/thumb-';
var tmp = '/tmp/';

var deleteOriginalFile = function (filename) {
  filesystem.exists(path + thumbs + filename, function(hasThumbnail) {
    if (hasThumbnail) {
      filesystem.unlink( path + thumbs + filename, function (err) {
        if (err) console.log('Error deleting thumbnail: ' + err);
      });
    }
  });
  filesystem.exists(path + filename, function(hasOriginal) {
    if (hasOriginal) {
      filesystem.unlink(path + filename, function (err) {
        if (err) console.log('Error deleting original picture: ' + err);
      });
    }
  });
}

var deleteTempFile = function (filename) {
  filesystem.exists(path + tmp + filename, function(hasTemp) {
    if (hasTemp) {
      filesystem.unlink( path + tmp + filename, function (err) {
        if (err) console.log('Error deleting temp file: ' + err);
      });
    }
  });
}

module.exports.add = function (req, res) {
  var picture = new Picture(req.body);
  
  // make thumbnail
  lwip.open( path + tmp + picture.url, function (err, image) {
    image.batch()
      .resize(300, 300)
      .writeFile(path + thumbs + picture.url, "jpg", { quality : 70 }, function (err) {
        if (err) console.log('Error writing thumbnail: ' + err);
      });
  });

  // make original
  lwip.open( path + tmp + picture.url, function (err, image) {

    // consider aspect ratio
    if (image.width() > image.height()) {
      var x = 1920;
      var y = image.height() * x / image.width();
    } else {
      var y = 1920;
      var x = image.width() * y / image.height();
    }

    image.batch()
      .resize(x, y)
      .writeFile(path + picture.url, "jpg", { quality : 80 }, function (err) {
        if (err) console.log('Error writing thumbnail: ' + err);
        // delete temp
        deleteTempFile(picture.url);
        // store in mongo
        picture.save(function (err, result) {
          if (err) console.log(err);
          res.json(result);
        });
      });
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
    if (err) console.log(err);
    if (result) {
      deleteOriginalFile(result.url);
    }
    res.json(result);
  });
}

module.exports.deleteByFilename = function (req, res) {
  deleteTempFile(req.params.filename);
  res.send(200);
}

module.exports.upload = function (req, res) {
  var form = new multiparty.Form({ uploadDir : path + tmp });
  form.parse(req, function(err, fields, files) {
    if (err) console.log(err);
    res.json(files);
  });
}