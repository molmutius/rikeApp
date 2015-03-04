var express               = require('express');
var app                   = express();
var bodyParser            = require('body-parser');
var mongoose              = require('mongoose');
var pictureController     = require('./server/controllers/picture-controller');
var categoryController    = require('./server/controllers/category-controller');
var passport              = require('passport');
var session               = require('express-session');
var flash                 = require('connect-flash');

// connect mongodb
var ip = 'localhost';
if (process.env.IP) {
  ip = 'process.env.IP';
}
mongoose.connect('mongodb://'+ ip +':27017/rikeApp');

// passport
require('./server/passport')(passport);
app.use(session({ secret : 'superduperphotographystuffstuff', saveUninitialized: true, resave:true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// body parser 
app.use(bodyParser.urlencoded({extended:true}));

// statics
app.use('/css', express.static(__dirname + '/admin_client/css'));
app.use('/js', express.static(__dirname + '/admin_client/js'));
app.use('/bower', express.static(__dirname + '/bower_components/'));
app.use('/uploads', express.static(__dirname + '/uploads/'));

// REST API PICTURES
app.get('/api/pics', pictureController.list);
app.post('/api/pics', pictureController.add);
app.delete('/api/pics/:id', pictureController.delete);
app.post('/api/pics/upload', pictureController.upload);
app.delete('/api/pics/unlink/:filename', pictureController.deleteByFilename);

// REST API CATEGORY
app.get('/api/cat', categoryController.list);
app.post('/api/cat', categoryController.add);
app.delete('/api/cat/:id', categoryController.delete);

// admin routes
require('./server/routes/admin-routes.js')(app, passport);

// start server
var port = 3000;
if (process.env.PORT) {
  port = process.env.PORT; // cloud9
}

app.listen(port, function() {
  console.log('I\'m Listening on ' + port + '...');
})