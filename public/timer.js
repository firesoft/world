function Timer() {
	this.startTime = 0;
	this.lastTime = 0;
	this.delta = 0;
	
	this.reset();
}

Timer.prototype.reset = function() {
	this.startTime = this.getCurrentTime();
	this.lastTime = this.startTime;
	this.delta = 0;
}

Timer.prototype.update = function() {
	var current = this.getCurrentTime();
	this.delta = current - this.lastTime;
	if (this.delta > 0) {
		this.lastTime = current;
	}
	
	return this.delta;
}

Timer.prototype.getDelta = function() {
	return this.delta;
}

Timer.prototype.getCurrentTime = function() {
	return (new Date().getTime())/1000;
}