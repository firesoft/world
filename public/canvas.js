function Canvas(containerHandle, canvasSize) {
	
	this.canvas = null;
	this.canvasSize = canvasSize;
	this._createCanvas(containerHandle);
	
	this.context = this.canvas.getContext('2d');
	this.canvasScalling = new CanvasScalling(containerHandle, this.canvas);
}

Canvas.prototype._createCanvas = function(containerHandle) {
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.canvasSize[0];
	this.canvas.height = this.canvasSize[1];
	
	containerHandle.appendChild(this.canvas);
}

Canvas.prototype.getContext = function() {
	return this.context;
}

Canvas.prototype.getWidth = function() {
	return this.canvasSize[0];
}

Canvas.prototype.getHeight = function() {
	return this.canvasSize[1];
}