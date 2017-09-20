var express = require('express');
var session = require('express-session');

var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ueditor = require('ueditor');

var db = require('./db.js');
var routes = require('./routes/index');
var user = require('./controller/user');

var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());

//静态文件目录
app.use(express.static(path.join(__dirname, '../public')));

app.get('/login', function(req, res, next) {
	if (session.userid) {
       res.redirect('/home');
	}
	else {
		res.sendfile(path.join(__dirname, '../public/index.html')); // 发送静态文件
	}
});

app.get('/toLogin', user.toLogin);

// app.use(function (req, res, next) {
//     if (session.userid) {
//         next();
//     } else {
//        	res.redirect('/login');
//     }
// })

app.use("/ueditor", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
	// ueditor 客户发起上传图片请求
	
	if(req.query.action === 'uploadimage'){
		var foo = req.ueditor;
		console.log(foo.filename); // exp.png
		console.log(foo.encoding); // 7bit
		console.log(foo.mimetype); // image/png

		// 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
		var img_url = 'yourpath';
		console.log(123);
		res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
	}

	//  客户端发起图片列表请求
	else if (req.query.action === 'listimage'){
		var dir_url = 'your img_dir'; // 要展示给客户端的文件夹路径
		res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
	}

	// 客户端发起其它请求
	else {
		res.setHeader('Content-Type', 'application/json');
		res.sendfile(path.join(__dirname, 'common/ueditor.config.json')); // 发送静态文件
	}
}));


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