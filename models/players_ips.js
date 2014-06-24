var players = require('./players.js');
var mysql = require('../libs/gd_mysql.js');

function get(playerIds, callback) {
	var query = 'select playerId, address from ganymede_games.players_last_action where playerId in (' + playerIds.join() + ')';
	
	mysql.query(query, 'set1', function(err, rows) {
		if (err) return callback(err, null);
		callback(null, parseData(rows));
	});
}

function parseData(rows) {
	var obj = {};
	rows.forEach(function(row) {
		obj[row.playerId] = row.address;
	});
	return obj;
}

module.exports.get = get;