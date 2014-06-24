var _ = require('lodash');
var mysql = require('../libs/gd_mysql.js');

function get(callback) {
	var query = 'select distinct `playerId` from ganymede_games.rtm_instances';
	mysql.query(query, 'set1', function(err, data) {
		if (err) return callback(err, null);
		callback(null, _.pluck(data, 'playerId'));
	});
}

module.exports.get = get;