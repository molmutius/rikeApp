path = require('path');

module.exports = function(app) {	
	// send main angular index.html
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname + '/../../front_client/views/index.html'));
	});

	// deliver rendered partials for angular
	app.get('/views/partials/:filename', function(req, res){
		var filename = req.params.filename;
		if(!filename) return;
		res.sendFile(path.join(__dirname + '/../../front_client/views/partials/' + filename + '.html'));
	});
};