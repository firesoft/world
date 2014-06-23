function CanvasScalling(containerHandle, canvasHandle) {
	this.containerHandle = containerHandle;

	this.width = canvasHandle.width;
	this.height = canvasHandle.height;

	this.bindResize();
	this.resize();
}

CanvasScalling.prototype.bindResize = function() {
	var _this = this;
	
	window.addEventListener('resize', function(){_this.resize()}, false);
	window.addEventListener('orientationchange', function(){_this.resize()}, false);
}

CanvasScalling.prototype.resize = function() {
	var browserSize = [window.innerWidth, window.innerHeight];
	var scale = Math.min(browserSize[0]/this.width, browserSize[1]/this.height);
	var size = [this.width*scale, this.height*scale];
	
	var offset = [(browserSize[0] - size[0]) / 2, (browserSize[1] - size[1]) / 2];
	
	var rule = "translate(" + offset[0] + "px, " + offset[1] + "px) scale(" + scale + ")";
	
	this.containerHandle.style.transform = rule;
	this.containerHandle.style.webkitTransform = rule;
}