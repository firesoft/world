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
	var players = [];
	rows.forEach(function(row) {
		var ip = parseIp(row.address);
		if (isValidIp(ip)) {
			players.push({playerId: playerId, ip: ip});
		}
	});
	return obj;
}

function isValidIp(ip) {
	return (ip && ip!='0.0.0.0');
}

function parseIp(ip) {
	if (!ip) return null;
	return ip.split(':')[0];
}

module.exports.get = get;