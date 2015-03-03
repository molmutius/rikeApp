module.exports = function(app, passport) {

	// send main angular index.html
	app.get('/admin/', function (req, res) {
	  res.sendfile('./admin_client/views/index.html');
	});

	// deliver rendered partials for angular
	app.get('/admin/views/partials/:filename', function(req, res){
	  var filename = req.params.filename;
	  if(!filename) return;  // might want to change this
	  res.sendfile('./admin_client/views/partials/' + filename + '.html');
	});

}
