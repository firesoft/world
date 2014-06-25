var FADE_TIME = 3;
var LIVE_TIME = 30;
var MAX_ALPHA = 0.5;

function Player(player) {
	this.playerId = player.playerId;
	this.position = {x: player.long, y: player.lat};
	this.liveTime = LIVE_TIME;
	this.timer = 0;
	this.alpha = 0;
	
	this.state = false;
	
	this._initLiveTime();
}

Player.prototype._initLiveTime = function() {
	var min = 0.9*LIVE_TIME;
	var max = 1.1*LIVE_TIME;
	
	this.liveTime = Math.random()*(max-min) + min;
}

Player.prototype.isKilled = function() {
	return this.state == 'killed';
}

Player.prototype.renew = function(x, y) {
	this.timer = FADE_TIME;
	
	if (this.position.x != x || this.position.y != y) {
		this._updatePosition(x, y);
	}
}

Player.prototype.getState = function() {
	return this.state;
}

Player.prototype._updatePosition = function(x, y) {
	this.position = {x: x, y: y};
}

Player.prototype._updateState = function() {
	if (this.timer < FADE_TIME) {
		this.state = 'fadein';
	} else if (this.timer >= FADE_TIME && this.timer <= this.liveTime-FADE_TIME) {
		this.state = 'stable';
	} else if (this.timer <= this.liveTime) {
		this.state = 'fadeout';
	} else {
		this.state = 'killed';
	}
}

Player.prototype._calculateAlpha = function() {
	if (this.state == 'fadein') {
		this.alpha = this.timer/FADE_TIME * MAX_ALPHA;
	} else if (this.state == 'stable') {
		this.alpha = MAX_ALPHA;
	} else if (this.state == 'fadeout') {
		this.alpha = (this.liveTime - this.timer)/FADE_TIME * MAX_ALPHA;
	} else if (this.killed) {
		this.alpha = 0;
	}
}

Player.prototype.update = function(delta) {
	this.timer += delta;
	this._updateState();
	this._calculateAlpha();
}

Player.prototype.render = function(renderSystem) {
	var ctx = renderSystem.getContext();
	ctx.save();
	var pos = renderSystem.convertPointFromWorldToScreen([this.position.x-1, this.position.y-1]);
	//console.log(pos);
	var size = renderSystem.convertSizeFromWorldToScreen([0.5, 0.5]);
	ctx.fillStyle = "#00FF00";
	ctx.globalAlpha = this.alpha;
	ctx.fillRect(pos[0], pos[1], size[0], size[1]);
	ctx.restore();
}