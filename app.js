var express = require('express');
var app = express();

var players = require('./models/players.js');

app.use(express.static(__dirname + '/public'));

app.get('/players', function(req, res){
	players.get(function(err, data) {
		if (err) {
			res.json(500, {message: 'Internal server error.'});
		} else {
			res.json(data);
		}
	});
});

app.listen(8080);