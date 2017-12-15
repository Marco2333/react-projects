var path = require('path');
var express = require('express');

var page = require("./page.bundle").page;

var app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/index', function(req, res) {
	var props = {
		initialCount: 1
	};
	var html = page(props);
	
	res.end(html);
});

var port = 3000;

app.listen(port, function() {
	console.log('Listening on port %d', port);
});