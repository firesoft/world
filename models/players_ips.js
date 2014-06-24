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
		var ip = parseIp(row.address);
		if (ip) {
			obj[row.playerId] = ip;
		}
	});
	return obj;
}

function parseIp(ip) {
	if (!ip) return null;
	return ip.split(':')[0];
}

module.exports.get = get;