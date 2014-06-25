var asyns = require('async');
var _ = require('lodash');

var activePlayersCore2 = require('./active_players_core2.js');
var activePlayersCore3 = require('./active_players_core3.js');
var activePlayersExternal = require('./active_players_external.js');

function get(callback) {
	async.parallel({
		core2: activePlayersCore2.get,
		core3: activePlayersCore3.get,
		external: activePlayersExternal.get
	}, function(err, data) {
		if (err) return callback(err, null);
		callback(parseResults(data));
	});
}

function parseResults(results) {
	return _.union(results.core2, results.core3, results.external);
}

module.exports.get = get;