var express               = require('express'),
    app                   = express(),
    bodyParser            = require('body-parser'),
    mongoose              = require('mongoose'),
    pictureController     = require('./server/controllers/picture-controller'),
    categoryController    = require('./server/controllers/category-controller');

var ip = 'localhost';
if (process.env.IP) {
  ip = 'process.env.IP';
}
mongoose.connect('mongodb://'+ ip +':27017/rikeApp');

app.use(bodyParser());

// send main angular index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client/views/index.html');
});

// deliver rendered partials for angular
app.get('/views/partials/:filename', function(req, res){
  var filename = req.params.filename;
  if(!filename) return;  // might want to change this
  res.sendfile(__dirname + '/client/views/partials/' + filename + '.html');
});

// statics
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/bower', express.static(__dirname + '/bower_components/'));
app.use('/uploads', express.static(__dirname + '/uploads/'));

// REST API PICTURES
app.get('/api/pics', pictureController.list);
app.post('/api/pics', pictureController.add);
app.delete('/api/pics/:id', pictureController.delete);
app.post('/api/pics/upload', pictureController.upload);

// REST API CATEGORY
app.get('/api/cat', categoryController.list);
app.post('/api/cat', categoryController.add);
app.delete('/api/cat/:id', categoryController.delete);

// start server
var port = 3000;
if (process.env.PORT) {
  port = process.env.PORT; // cloud9
}

app.listen(port, function() {
  console.log('I\'m Listening on ' + port + '...');
})