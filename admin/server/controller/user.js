var mysql = require('mysql');

var db = require('../db.js');

module.exports.toLogin = function(req, res, next) {
	console.log(req.query);
	let {username, password} = req.query;
    
    let sql = `select password from user where username = ${mysql.escape(username)}`;
	console.log(sql);
    db.query(sql, function(err, rows) {
        if(err) {
            res.json({"status": 0, "message": err});
        }
		else {
			console.log(rows);
			if(rows.length !== 0 && password === rows[0]['password']) {
				res.json({"status": 1});
			}
			else {
				res.json({"status": 0, "message": "用户名或者密码错误"});
			}
		}
    })
}