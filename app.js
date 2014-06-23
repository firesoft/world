var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/players', function(req, res){

	var playersObj = {
		playersCount: 2,
		players: [
			{playerId: 123, x: 19.938333, y: 50.061389},
			{playerId: 2345, x: -118.25, y: 34.05}
		]
	};

  res.json(playersObj);
});

app.listen(8080);