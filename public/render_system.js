function RenderSystem(params) {
	this.worldViewport = params.worldViewport;
	this.canvasViewport = params.canvasViewport;
	
	this.canvas = new Canvas(params.canvasContainer, params.canvasSize);
	
	this.scaleX = 1;
	this.scaleY = 1;
	
	this.updateScale();
	
}

RenderSystem.prototype.getCanvas = function() {
	return this.canvas;
}

RenderSystem.prototype.getContext = function() {
	return this.canvas.getContext();
}

RenderSystem.prototype.updateScale = function() {
	this.scaleX = (this.canvasViewport.max[0] - this.canvasViewport.min[0])/(this.worldViewport.max[0] - this.worldViewport.min[0]);
	this.scaleY = (this.canvasViewport.max[1]- this.canvasViewport.min[1])/(this.worldViewport.max[1] - this.worldViewport.min[1]);
}

RenderSystem.prototype.convertPointFromWorldToScreen = function(point) {
	var x = Math.round((point[0]-this.worldViewport.min[0])*this.scaleX + this.canvasViewport.min[0]);
	var y = Math.round((point[1]-this.worldViewport.min[1])*this.scaleY + this.canvasViewport.min[1]);
	
	return [x, y];
}

RenderSystem.prototype.convertSizeFromWorldToScreen = function (size) {
	return [Math.round(size[0] * this.scaleX), Math.round(size[1] * this.scaleY)];
}

RenderSystem.prototype.getScale = function() {
	return [this.scaleX, 0 - this.scaleY];
}