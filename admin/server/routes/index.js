let os = require('os');
let path = require('path');
var mysql = require('mysql');
let multer = require('multer');
let express = require('express');

let user = require('../controller/user');
let db = require('../db.js');
let {getClientIP, getServerIP} = require('../common/system')

let router = express.Router();
let upload = multer({dest: path.resolve(__dirname, '../../public/image/gossip')});

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

router.get('/article-delete/:id', function(req, res, next) {
	let {id} = req.params;
	db.query(`update article set status = 0 where id = ${+id}`, function(err, rows) {
		if(err) {
			res.json({status: 0, message: '删除失败'})
		}
		else {
			res.json({status:1});
		}
	})
})

router.get('/get-article-detail/:id', function(req, res, next) {
	let {id} = req.params;
	db.query(`select id, title, body, type, category, tag from article where id = ${+id} and status = 1`, function(err, rows) {
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

router.post('/article-submit', function(req, res, next) {
	let {id, content, title, tag, category, type} = req.body;

	let sql = "";
	if( id != null) {
		sql = `update article set body = ${mysql.escape(content)}, title = ${mysql.escape(title)}, tag = ${mysql.escape(tag)}, category = ${category}, type = ${type}, updated_at = "${new Date().toLocaleDateString()}" where id = ${+id}`;
	}
	else {
		sql = `insert into article(title, tag, category, type, created_at, body) values (${mysql.escape(title)}, ${mysql.escape(tag)}, ${category}, ${type}, "${new Date().toLocaleDateString()}", ${mysql.escape(content)})`
	}

	db.query(sql, function(err, rows) {
		if(err) {
			console.log(err);
			res.json({status: 0, message: '查询失败'})
		}
		else {
			res.json({status:1});
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

router.get('/gather-delete/:id', function(req, res, next) {
	let {id} = req.params;
	db.query(`update gather set status = 0 where id = ${+id}`, function(err, rows) {
		if(err) {
			res.json({status: 0, message: '删除失败'})
		}
		else {
			res.json({status:1});
		}
	})
})

router.get('/gather/:id', function(req, res, next) {
	let {id} = req.params;
	db.query(`select id, title, detail, tag from gather where id = ${+id} and status = 1`, function(err, rows) {
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

router.post('/gather-submit', function(req, res, next) {
	let {id, content, title, tag} = req.body;

	let sql = "";
	if( id != null) {
		sql = `update gather set detail = ${mysql.escape(content)}, title = ${mysql.escape(title)}, tag = ${mysql.escape(tag)}, updated_at = "${new Date().toLocaleDateString()}" where id = ${+id}`;
	}
	else {
		sql = `insert into gather(title, tag, created_at, detail) values (${mysql.escape(title)}, ${mysql.escape(tag)}, "${new Date().toLocaleDateString()}", ${mysql.escape(content)})`
	}
	
	db.query(sql, function(err, rows) {
		if(err) {
			console.log(err);
			res.json({status: 0, message: '查询失败'})
		}
		else {
			res.json({status:1});
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

router.get('/gossip-delete/:id', function(req, res, next) {
	let {id} = req.params;
	db.query(`delete from gossip where id = ${+id}`, function(err, rows) {
		if(err) {
			res.json({status: 0, message: '删除失败'})
		}
		else {
			res.json({status:1});
		}
	})
})

router.get('/gossip/:id', function(req, res, next) {
	let {id} = req.params;
	db.query(`select id, detail, file_name, save_name from gossip where id = ${+id}`, function(err, rows) {
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

router.post('/gossip-submit', upload.single('file'), function(req, res, next) {
	let sql = "", fileName = null, saveName = null;
	let {id, detail} = req.body;
	
	if(req.file) {
		fileName = req.file.originalname;
		saveName = req.file.filename;
	}
	if( id != null) {
		sql = `update gossip set detail = "${mysql.escape(detail)}", file_name = ${mysql.escape(fileName)}, save_name = ${mysql.escape(saveName)},  updated_at = "${new Date().toLocaleDateString()}" where id = ${+id}`;
	}
	else {
		sql = `insert into gossip(created_at, detail, file_name, save_name) values ("${new Date().toLocaleDateString()}", ${mysql.escape(detail)}, ${mysql.escape(fileName)},  ${mysql.escape(saveName)})`;
	}

	db.query(sql, function(err, rows) {
		if(err) {
			console.log(err);
			res.json({status: 0, message: '查询失败'})
		}
		else {
			res.json({status:1});
		}
	})
})

router.get('/get-categories', function(req, res, next) {
	let {id} = req.params;
	db.query(`select id, theme from category where status = 1`, function(err, rows) {
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
