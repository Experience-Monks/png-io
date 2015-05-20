THREE = require('three');

var PNGIO = require('./');

var width = 512;
var height = 512;

// Create canvas append to document body (draw to it)
var canvas = document.createElement('canvas');
canvas.id     = 'canvas';
canvas.width  = width;
canvas.height = height;
canvas.style.zIndex   = 8;
canvas.style.position = 'absolute';

var context2D = canvas.getContext('2d');

var my_gradient = context2D.createLinearGradient(0,0,0,170);
my_gradient.addColorStop(0, "black");
my_gradient.addColorStop(1, "blue");

context2D.fillStyle = my_gradient;
context2D.fillRect(0, 0, width, height);

document.body.appendChild(canvas);

// Convert to base64 png string
var pngUrl = canvas.toDataURL(); // PNG is the default

var startIndex = pngUrl.indexOf(',') + 1;
var pngDataRaw = pngUrl.substring(startIndex);

var pngio = new PNGIO('file.png');
pngio.save(pngDataRaw, function() {
	console.log('success');
}, 
function() {
	console.log('failure');
});


