var express = require('express');
var session = require('express-session');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var db = require('./db.js');
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(session({
	name: 'blog.sid',
	resave: false, // don't save session if unmodified  
	saveUninitialized: false, // don't create session until something stored  
	secret: '5A16C79BDE24BCFF'
}));

//静态文件目录
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../../resource')));

app.use(function (req, res, next) {
	if(req.session.record || req.url === '/get-navside-info') {
		next();
	} else {
		req.session.record = true;
		db.query("update config set value = value + 1 where name = 'view_count'", function(err, rows) {
			next();
		})
	}
});

app.use('/', routes);

// development error handler will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;