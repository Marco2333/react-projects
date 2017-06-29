var path = require('path');
var express = require('express');

var app = express();


var router = express.Router();

//静态文件目录，
app.use(express.static(path.join(__dirname, './public')));

router.get('*', function(req, res, next) {
	res.sendfile(path.join(__dirname, './public/index.html')); // 发送静态文件
});

app.use(router);

app.listen(3000, function() {
	console.log('Listening on 3000');
});