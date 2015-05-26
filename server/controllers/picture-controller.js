var Picture = require('../models/picture');
var multiparty = require('multiparty');
var filesystem = require('fs');
var lwip = require('lwip');
var path = require('path');

var rootPath = __dirname + '/../../uploads/';
var thumbs = '/thumbs/thumb-';
var tmp = '/tmp/';

var JobProcessor = {
  jobqueue: [],
  shouldRun: false,
  setRunStatus: function(value) {
    this.shouldRun = value;
    if (this.shouldRun == true) {
      processQueue();
    };
  }, 
};

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

var processPicture = function (picture) {
  // make thumbnail
  lwip.open( path.join(rootPath + tmp + picture.url), function (err, image) {
    if (err) {
      console.log(err);
      return;
    } 
    var size = calculateAspectRatioFit(image.width(), image.height(), 450, 450);
    image.batch()
      .resize(size.width, size.height)
      .writeFile( path.join(rootPath + thumbs + picture.url), "jpg", { quality : 70 }, function (err) {
        if (err) console.log('Error writing thumbnail: ' + err);
      });
  });

  // make full size
  lwip.open( path.join(rootPath + tmp + picture.url), function (err, image) {
    if (err) {
      console.log(err);
      return;
    } 
    var size = calculateAspectRatioFit(image.width(), image.height(), 1920, 1920);
    image.batch()
      .resize(size.width, size.height)
      .writeFile( path.join(rootPath + picture.url), "jpg", { quality : 80 }, function (err) {
        if (err) console.log('Error writing thumbnail: ' + err);
        // delete temp
        deleteTempFile(picture.url);
        // store in mongo
        picture.save(function (err, result) {
          if (err) console.log(err);
          //res.json(result);
          console.log('Done Saving Picture.')
        });
      });
  });
  console.log('Done Processing Picture.');
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth*ratio, height: srcHeight*ratio };
}

var processQueue = function () {
// process queue until empty
  if (JobProcessor.shouldRun) {
    while (JobProcessor.jobqueue.length != 0) {
      // there are jobs left
      console.log("processing ...");
      processPicture(JobProcessor.jobqueue.pop());
    }
    JobProcessor.setRunStatus(false);
  }
}

module.exports.add = function (req, res) {
  var picture = new Picture(req.body);
  JobProcessor.jobqueue.push(picture);
  JobProcessor.setRunStatus(true);
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
  var cat = req.params.cat.split("+")[0];
  var sub = req.params.cat.split("+")[1];
  Picture.find({category: cat, subcategory: sub}, function (err, results) {
    if (err) console.log(err);
    res.json(results);
  })
  //res.writeHead(200);
  //res.end("No pictures found.");
}