function GameFeeder(params) {
	this.url = params.feedUrl;
	this.refreshTime = params.refreshTime * 1000;
}

GameFeeder.prototype.get = function(callback) {
	var _this = this;
	var xhr = jQuery.ajax(this.url, {dataType: 'json'});
	xhr.done(function(data) {
		callback(data);
	});
	xhr.always(function() {
		window.setTimeout(function() {
			_this.get(callback);
		}, _this.refreshTime)
	});
}

