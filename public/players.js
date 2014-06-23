function Players() {
	this.data = {};
}

Players.prototype.add = function(player) {
	var playerId = player.playerId;
	if (this.data.hasOwnProperty(playerId)) {
		this.data[playerId].renew(player.x, player.y);
	} else {
		this.data[playerId] = new Player(player);
	}
}

Players.prototype.update = function(delta) {
	for(playerId in this.data) {
		var player = this.data[playerId];
		player.update(delta);
		if (player.isKilled()) {
			delete this.data[playerId];
		}
	}
}

Players.prototype.render = function(renderSystem) {
	for(playerId in this.data) {
		var player = this.data[playerId];
		player.render(renderSystem);
	}
}