function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {

		// Check if the XMLHttpRequest object has a "withCredentials" property.
		// "withCredentials" only exists on XMLHTTPRequest2 objects.
		xhr.open(method, url, true);

	} else if (typeof XDomainRequest != "undefined") {

		// Otherwise, check if XDomainRequest.
		// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
		xhr = new XDomainRequest();
		xhr.open(method, url);

	} else {

		// Otherwise, CORS is not supported by the browser.
		xhr = null;

	}
	return xhr;
}

function put(url, data, callback, errorCallback){

	var xhr = createCORSRequest('PUT', url);
	if (!xhr){
		throw new Error('CORS not supported');
	}

	xhr.send(data);

	/*SUCCESS -- do somenthing with data*/
	if(callback) {
		xhr.onload = function(){
			// process the response.
			callback(xhr.responseText);
		};
	}

	if(errorCallback) {
		xhr.onerror = function(e){
			errorCallback(e);
		};
	}
}

function PNGIO(filePath) {
	this.filePath = filePath;
	if(PNGIO.debugLevel >= 1) console.log('IO open to', filePath, 'on port: ' + PNGIO.port);
	this.fileioPath = PNGIO.fileIOServerString + filePath;
	
}

PNGIO.prototype = {
	save: function(data, callback, errorCallback) {
		put(this.fileioPath, data, callback, errorCallback);
	}
}

//module parameters
PNGIO.setPort = function (port) {
	PNGIO.port = port;
	PNGIO.debugLevel = 0;
	var loc = window.location;
	PNGIO.fileIOServerString = loc.protocol + '//' + loc.hostname + ':' + PNGIO.port + loc.pathname;
}
PNGIO.setPort(3000);

module.exports = PNGIO;