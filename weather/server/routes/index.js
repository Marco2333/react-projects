var path = require('path');
var http = require('http');
var request = require('request');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, "../../public/index.html"))
});

router.get('/cityinfo/:cityId', function(req, res, next) {
	var cityId = req.params.cityId,
		url = `http://www.weather.com.cn/data/cityinfo/${cityId}`;

	var opt = {
		hostname: 'www.weather.com.cn', // 目标主机
		method: req.method, // 请求方式
		path: `/data/cityinfo/${cityId}`, // 目标路径
	};

	/*方法1*/
	// var sreq = http.request(opt, function(response) {
	// 	var content = '';

	// 	response.on('data', function(body) {
	// 		content += body;
	// 	}).on("end", function() {
	// 		res.writeHead(200, {
	// 			'Content-Type': 'text/json'
	// 		});
	// 		res.write(content);
	// 		res.end();
	// 	});

	// }).on('error', function(e) {
	// 	console.log("Got error: " + e.message);
	// });
	// sreq.end();

	/*方法2*/
	var sreq = http.request(opt, function(response) {
		response.pipe(res);
		response.on('end', function() {
			console.log('done');
		});
	});

	if (/POST|PUT/i.test(req.method)) {
		req.pipe(sreq);
	} else {
		sreq.end();
	}
});

module.exports = router;