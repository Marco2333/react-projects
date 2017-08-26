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

router.get('/get-articles', function(req, res, next) {
	db.query('select id, title, type, tag, created_at, views from article where status = 1 order by id desc', function(err, rows) {
		if(err) {
			res.json({status: 0, message: '查询失败'})
		}
		else {
			res.json({status:1, info: rows});
		}
	})
})

router.get('/get-article-detail/:id', function(req, res, next) {
	let {id} = req.params;
	db.query(`select id, title, body, type, tag from article where id = ${+id} and status = 1`, function(err, rows) {
		if(err) {
			res.json({status: 0, message: '查询失败'})
		}
		else {
			if(rows.length == 1) {
				res.json({status:1, info: rows[0]});
			}
			else {
				res.json({status:1, info: {}});
			}
		}
	})
})

router.get('/get-gather', function(req, res, next) {
	db.query('select id, title, tag, created_at from gather where status = 1 order by id desc', function(err, rows) {
		if(err) {
			res.json({status: 0, message: '查询失败'})
		}
		else {
			res.json({status:1, info: rows});
		}
	})
})

router.get('/get-gossip', function(req, res, next) {
	db.query('select id, detail, created_at from gossip order by id desc', function(err, rows) {
		if(err) {
			res.json({status: 0, message: '查询失败'})
		}
		else {
			res.json({status:1, info: rows});
		}
	})
})

router.get('*', function(req, res, next) {
    res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});

module.exports = router;
