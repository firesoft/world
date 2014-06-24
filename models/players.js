var asyns = require('async');
var _ = require('lodash');

var playersCore2 = require('./players_core2.js');
var playersCore3 = require('./players_core3.js');
var playersExternal = require('./players_external.js');

function get(callback) {
	async.parallel({
		core2: playersCore2.get,
		core3: playersCore3.get,
		external: playersExternal.get
	}, function(err, data) {
		if (err) return callback(err, null);
		callback(parseResults(data));
	});
}

function parseResults(results) {
	return _.union(results.core2, results.core3, results.external);
}

module.exports.get = get;