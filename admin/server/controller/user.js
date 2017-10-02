var mysql = require('mysql');
var session = require('express-session');

var db = require('../db.js');

module.exports.toLogin = function(req, res, next) {
	let {
		userid,
		password
	} = req.query;

	let sql = `select password from user where userid = ${mysql.escape(userid)}`;

	db.query(sql, function(err, rows) {
		if (err) {
			res.json({
				"status": 0,
				"message": err
			});
		} else {
			if (rows.length !== 0 && password === rows[0]['password']) {
				session.userid = userid;
				res.json({
					"status": 1
				});
			} else {
				res.json({
					"status": 0,
					"message": "用户名或者密码错误"
				});
			}
		}
	})
}