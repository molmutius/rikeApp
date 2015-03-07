var Picture = require('../models/picture');
var multiparty = require('multiparty');
var filesystem = require('fs');
var lwip = require('lwip');
var path = require('path');

var rootPath = __dirname + '/../../uploads/';
var thumbs = '/thumbs/thumb-';
var tmp = '/tmp/';

var deleteOriginalFile = function (filename) {
  filesystem.exists(path.join(rootPath + thumbs + filename), function(hasThumbnail) {
    if (hasThumbnail) {
      filesystem.unlink( rootPath + thumbs + filename, function (err) {
        if (err) console.log('Error deleting thumbnail: ' + err);
      });
    }
  });
  filesystem.exists(path.join(rootPath + filename), function(hasOriginal) {
    if (hasOriginal) {
      filesystem.unlink(path.join(rootPath + filename), function (err) {
        if (err) console.log('Error deleting original picture: ' + err);
      });
    }
  });
}

var deleteTempFile = function (filename) {
  filesystem.exists(path.join(rootPath + tmp + filename), function(hasTemp) {
    if (hasTemp) {
      filesystem.unlink(path.join(rootPath + tmp + filename), function (err) {
        if (err) console.log('Error deleting temp file: ' + err);
      });
    }
  });
}

module.exports.add = function (req, res) {
  var picture = new Picture(req.body);
  
  // make thumbnail
  lwip.open( path.join(rootPath + tmp + picture.url), function (err, image) {
    if (err) console.log(err);
    var scaleFactor = 0.5;
    if (image.width() > 1080 || image.height() > 1080) {
      scaleFactor = 0.4;
    } else 
    if (image.width() > 1920|| image.height() > 1920) {
      scaleFactor = 0.3;
    }
    image.batch()
      .scale(scaleFactor)
      .crop(300,300)
      .writeFile( path.join(rootPath + thumbs + picture.url), "jpg", { quality : 70 }, function (err) {
        if (err) console.log('Error writing thumbnail: ' + err);
      });
  });

  // make full size
  lwip.open( path.join(rootPath + tmp + picture.url), function (err, image) {
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
      .writeFile( path.join(rootPath + picture.url), "jpg", { quality : 80 }, function (err) {
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
  res.sendStatus(200);
}

module.exports.upload = function (req, res) {
  var form = new multiparty.Form({ uploadDir : path.join(rootPath + tmp) });
  form.parse(req, function(err, fields, files) {
    if (err) console.log(err);
    res.json(files);
  });
}

module.exports.listByCategory = function (req, res) {
  var cat = req.params.cat;
  Picture.find({category: cat}, function (err, results) {
    if (err) console.log(err);
    res.json(results);
  })
  //res.writeHead(200);
  //res.end("No pictures found.");
}