function getTimestamp() {
	return Math.round(Date.now()/1000);
}

module.exports.getTimestamp = getTimestamp;