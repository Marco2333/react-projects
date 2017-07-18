var path = require('path');
var express = require('express');

var routes = require('./routes/index');

var app = express();

//静态文件目录，
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);
app.use('cityinfo', routes);

module.exports = app;