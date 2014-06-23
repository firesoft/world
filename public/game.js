function Game(params) {

	this.renderSystem = null;
	
	this.world = null;
	
	this.timer = new Timer();
	this.assetManager = new AssetManager();
	this.fps = new Fps();
	this.players = new Players();
	this.feeder = params.feeder;
	this.initRenderSystem(params.container);
	this.loadAssets();
}

Game.prototype.initRenderSystem = function(container) {
	this.renderSystem = new RenderSystem({
		canvasContainer: container,
		worldViewport:{min: [-180, -90], max: [180, 90]},
		canvasViewport: {min: [0, 640], max: [1280, 0]},
		canvasSize: [1280, 640]
	});
}

Game.prototype.loadAssets = function() {
	var _this = this;
	this.assetManager.queueDownload('world', './earth2.jpg');
	this.assetManager.downloadAll(function(){_this._getGameObjects()});
}

Game.prototype._getGameObjects = function() {
	var _this = this;
	this.world = new World(this.assetManager.getAsset('world'));
	this.feeder.get(function(data){_this._setPlayers(data)})
	
	this.start();
}

Game.prototype._setPlayers = function(data) {
	var _this = this;
	data.players.forEach(function(player) {
		_this.players.add(player);
	});
}

Game.prototype.start = function() {
	this.mainLoop();
}

Game.prototype.update = function(delta) {
	if (!delta) {
		return;
	}
	this.players.update(delta);
	this.fps.update(delta);
}
Game.prototype.render = function() {
	
	this.world.render(this.renderSystem);
	this.fps.render(this.renderSystem);
	this.players.render(this.renderSystem);
}

Game.prototype.mainLoop = function() {
	var _this = this;
	var delta = this.timer.update();
	this.update(delta);
	this.render();
	
	requestAnimationFrame(function() {_this.mainLoop()});
}