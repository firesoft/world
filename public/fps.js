function Fps() {
	this.deltaSum = 0;
	this.deltaCount = 0;
	this.fps = 0;
	this.avgFps = 0;
}

Fps.prototype.update = function(delta) {
	this.incrementCounters(delta);
	if (this.deltaSum > 0.1) {
		this.evalAvgFps();
		this.resetCounters();
	}
	this.evalFps(delta);
}

Fps.prototype.evalFps = function(delta) {
	this.fps = Math.round(1/delta);
}

Fps.prototype.evalAvgFps = function() {
	this.avgFps = Math.round(this.deltaCount / this.deltaSum);
}

Fps.prototype.resetCounters = function() {
	this.deltaSum = 0;
	this.deltaCount = 0;
}

Fps.prototype.incrementCounters = function(delta) {
	this.deltaSum += delta;
	this.deltaCount++;
}

Fps.prototype.get = function() {
	return this.fps;
}

Fps.prototype.render = function(renderSystem) {
	var ctx = renderSystem.getContext();
	ctx.save();
	ctx.font = "normal 12px sans-serif";
	ctx.fillStyle = "#00ff00";
	ctx.fillText(this.avgFps, 1, 10);
	ctx.restore();
}