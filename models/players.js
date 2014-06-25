var _ = require('lodash');
var async = require('async');
var cache = require('memory-cache');

var activePlayers = require('./active_players.js');
var playersIps = require('./players_ips.js');
var playersCoordinates = require('./players_coordinates.js');


function get(callback) {

	var players = cache.get('players');
	if (players) {
		return callback(null, players);
	}

	async.waterfall([
		activePlayers.get,
		playersIps.get,
		playersCoordinates.get,
	], function(err, players) {
		if (err) return callback(err, null);
		cache.put('players', players, 3*60);
		callback(null, players);
	});
}


module.exports.get = get;