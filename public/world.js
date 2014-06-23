function World(img) {
	this.img = img;
}

World.prototype.render = function(renderSystem) {
	var ctx = renderSystem.getContext();
	ctx.drawImage(this.img, 0, 0, renderSystem.getCanvas().getWidth(), renderSystem.getCanvas().getHeight());
}