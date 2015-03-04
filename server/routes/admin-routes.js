path = require('path');

module.exports = function(app, passport) {

	// login
	app.get('/login', function(req, res) {
		//res.sendfile = __dirname + '/../../admin_client/views/login.html';

		var message = req.flash('loginMessage');
		var body = '<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">';
		body = body + '<div class="container">';
	    body = body + '<div><p>' + message + '</p></div>';
	    body = body + '<form action="/login" method="post">';
	    body = body + '<div class="form-group"><label>Username:</label>';
	    body = body + '<input type="text" name="email"/><br/></div>';
	    body = body + '<div><label>Password:</label>';
	    body = body + '<input type="password" name="password"/></div>';
	    body = body + '<div><input type="submit" value="Submit"/></div></form>';
	    body = body + '</div>';
	    res.send(body);
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/admin/',
		failureRedirect: '/login',
		falureFlash: true
	}));

	// DISABLED FOR PRODUCTION USE
	/*
	app.get('/signup', function (req,res) {
		var body = '<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">';
		body = body + '<div class="container">';
	    body = body + '<form action="/signup" method="post">';
	    body = body + '<div class="form-group"><label>Username:</label>';
	    body = body + '<input type="text" name="email"/><br/></div>';
	    body = body + '<div class="form-group"><label>Password:</label>';
	    body = body + '<input type="text" name="password"/></div>';
	    body = body + '<div><input type="submit" value="Submit"/></div></form>';
	    body = body + '</div>';
	    res.send(body);
	});
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/login',
        failureRedirect : '/signup', // redirect back to the signup page if
        // there is an error
        failureFlash : true
    // allow flash messages
    }));
	*/


	// send main angular index.html
	app.get('/admin/', isLoggedIn, function (req, res) {
		res.sendFile(path.join(__dirname + '/../../admin_client/views/index.html'));
	});

	// deliver rendered partials for angular
	app.get('/admin/views/partials/:filename', isLoggedIn, function(req, res){
		var filename = req.params.filename;
		if(!filename) return;
		res.sendFile(path.join(__dirname + '/../../admin_client/views/partials/' + filename + '.html'));
	});
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

