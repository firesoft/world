function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.downloadQueue = [];
}

AssetManager.prototype.queueDownload = function(key, path) {
    this.downloadQueue.push({key: key, path: path});
}

AssetManager.prototype.downloadAll = function(downloadCallback) {
    if (this.downloadQueue.length === 0) {
        downloadCallback();
    }
    
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var path = this.downloadQueue[i].path;
		var key = this.downloadQueue[i].key;
        var img = new Image();
        var _this = this;
        img.addEventListener("load", function() {
            console.log(this.src + ' is loaded');
            _this.successCount += 1;
            if (_this.isDone()) {
                downloadCallback();
            }
        }, false);
        img.addEventListener("error", function() {
            _this.errorCount += 1;
            if (_this.isDone()) {
                downloadCallback();
            }
        }, false);
        img.src = path;
        this.cache[key] = img;
    }
}

AssetManager.prototype.getAsset = function(key) {
    return this.cache[key];
}

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length == (this.successCount + this.errorCount));
}
