let os = require('os');
let path = require('path');
let express = require('express');

let user = require('../controller/user');
let db = require('../db.js');
let {getClientIP, getServerIP} = require('../common/system')

let router = express.Router();

router.get('/get-system-info', function(req, res, next) {
	let clientIP = getClientIP(req),
		serverIP = getServerIP();

	clientIP = clientIP.substr(clientIP.lastIndexOf(':') + 1);
	db.query('select version() as v', function(err, rows) {
		res.json({status: 1, info: {serverIP: serverIP, serverVersion: os.release(), 
				clientIP: clientIP, clientVersion: req.headers['user-agent'], dbVersion: rows[0]['v']} });
	});
})

router.get('*', function(req, res, next) {
    res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});

module.exports = router;
