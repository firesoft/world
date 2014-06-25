var _ = require('lodash');
var mysql = require('../libs/gd_mysql.js');
var functions = require('../libs/functions.js');

function get(callback) {
	var last5Mins = functions.getTimestamp() - 5*60;
	var query = 'select distinct `playerId` from ganymede_games.games_external_heartbeat where `time`>' + last5Mins;
	mysql.query(query, 'set1', function(err, data) {
		if (err) return callback(err, null);
		callback(null, _.pluck(data, 'playerId'));
	});
}

module.exports.get = get;