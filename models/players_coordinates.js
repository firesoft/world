var geoip = require('geoip-lite');

function get(players, callback) {
	if (!players.length) {
		return callback(null, []);
	}
	var playersCollection = [];
	players.forEach(function(player) {
		var geo = geoip.lookup(player.ip);
		if (geo && (geo.ll[0] || geo.ll[1])) {
			playersCollection.push({playerId: player.playerId, lat: geo.ll[0], long: geo.ll[1]});
		}
	});
	callback(null, playersCollection);
}

module.exports.get = get;