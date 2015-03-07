var express               = require('express');
var app                   = express();
var bodyParser            = require('body-parser');
var mongoose              = require('mongoose');
var pictureController     = require('./server/controllers/picture-controller');
var categoryController    = require('./server/controllers/category-controller');
var passport              = require('passport');
var session               = require('express-session');
var flash                 = require('connect-flash');
var favicon               = require('serve-favicon');
var path                  = require('path');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// admin statics
app.use('/css', express.static(__dirname + '/admin_client/css'));
app.use('/js', express.static(__dirname + '/admin_client/js'));
// front statics
app.use('/front/img', express.static(__dirname + '/front_client/img'));
app.use('/front/css', express.static(__dirname + '/front_client/css'));
app.use('/front/js', express.static(__dirname + '/front_client/js'));
// global statics
app.use('/bower', express.static(__dirname + '/bower_components/'));
app.use('/uploads', express.static(__dirname + '/uploads/'));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// REST API PICTURES
app.get('/api/pics', pictureController.list);
app.get('/api/pics/:cat', pictureController.listByCategory);
app.post('/api/pics', isLoggedIn, pictureController.add);
app.delete('/api/pics/:id', isLoggedIn, pictureController.delete);
app.post('/api/pics/upload', isLoggedIn, pictureController.upload);
app.delete('/api/pics/unlink/:filename', isLoggedIn, pictureController.deleteByFilename);

// REST API CATEGORY
app.get('/api/cat', categoryController.list);
app.post('/api/cat', isLoggedIn, categoryController.add);
app.delete('/api/cat/:id', isLoggedIn, categoryController.delete);

// admin routes
require('./server/routes/admin-routes.js')(app, passport);

// front routes
require('./server/routes/front-routes.js')(app);

// start server
var port = 3000;
if (process.env.PORT) {
  port = process.env.PORT; // cloud9
}

app.listen(port, function() {
  console.log('I\'m Listening on ' + port + '...');
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}