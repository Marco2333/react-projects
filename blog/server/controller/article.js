var mysql = require('mysql');
var session = require('express-session');

var db = require('../db.js');
var Str = require('../common/string');

module.exports.getArticles = function(req, res, next) {
	let {current, count, type, category, keyword, tag} = req.query;
	
	let field = "article.id, title, body, tag, created_at, views, theme";
	let sql = `select ${field} from article join category on article.category = category.id`,
		condition = " where article.status = 1",
		totalSql = '';

	if(tag != null) {
		let likeTag1 = mysql.escape(`%${tag + " "}%`),
			likeTag2 = mysql.escape(`%${" " + tag}%`);
		tag = mysql.escape(`${tag}`);
		
		condition += ` and (tag = ${tag} or tag like ${likeTag1} or tag like ${likeTag2})`;
	}
	if(keyword != null && keyword.trim() !== '') {
		keyword = mysql.escape(`%${keyword}%`);
		condition += ` and (body like ${keyword} or title like 
		${keyword} or tag like ${keyword})`;
	}
	if(category != null && +category !== 0) {
		condition += ` and category = ${+category}`;
	}
	if(type != null && +type !== 0) {
		condition += ` and type = ${+type}`;
	}

	sql += condition;
	sql += " order by created_at desc";

	if(count != null) {
		if(current != null) {
			sql += ` limit ${(+current - 1) * +count}, ${+count}`;
			totalSql += "select count(*) as total from article" + condition;
		}
		else {
			sql += ` limit ${+count}`;
		}
	}

	var deviceAgent = req.headers["user-agent"].toLowerCase(),
		agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/),
		absLen = agentID ? 86 : 130;
	
	db.query(sql, function(err, rows) {
		let info = {};
		let articles = [];

		if(err) {
			console.log(err);
			res.json({'status': 0, 'message': 'error'});
		}

		else {
			rows.forEach(item => {
				articles.push({
					'id': item.id,
					'title': item.title,
					'tag': item.tag,
					'abstract': Str.escape2Html(item.body.replace(/<\/?[^>]+(>|$)/g, "")).substr(0, absLen),
					'created_at': item.created_at,
					'views': item.views,
					'theme': item.theme
				})
			});
			info['articles'] = articles;
			
			if(current != null) {
				db.query(totalSql, function(err, totalRows) {
					if(err) {
						console.log(err);
						res.json({'status': 0, 'message': 'error'});
					}
					else {
						info['total'] = totalRows[0]['total'];
						res.json({'status': 1, 'info': info});
					}
				})
			}
			else {
				res.json({'status': 1, 'info': info});
			}
		}
	})
}

module.exports.getArticleDetail = function(req, res, next) {
	let {id} = req.params;
	let sql = `select article.id, title, body, tag, theme, created_at, updated_at, type, 
		views, markdown from article join category on article.category = category.id where 
		article.id = ${mysql.escape(id)} and article.status = 1`;

	if (!req.session['article_record_' + id]) {
		req.session['article_record_' + id] = true;
		db.query(`update article set views = views + 1 where id = ${id}`, function() {})
	}
	
	db.query(sql, function(err, rows) {
		if(err) {
			res.json({"status": 0, "message": err});
		}
		else {
			res.json({"status": 1, "_info": rows ? rows[0] : {}});
		}
	})
}

module.exports.getTimeline = function(req, res, next) {
	let sqls = [
		"select id, theme from category where status = 1"
	];

	let {current = 1, count = 30, category = 0} = req.query;
		
	let sql = "";
	let field = "article.id, title, created_at";

	if(category == 0) {
		sql = `select ${field} from article where article.status = 1
			order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
		sqls.push(sql);

		sql = 'select count(*) as total from article where status = 1';
		sqls.push(sql);
	} else{
		sql = `select ${field} from article where category = ${+category} and article.status = 1 
			order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
		sqls.push(sql);

		sql = `select count(*) as total from article where status = 1 and category = ${+category}`;

		sqls.push(sql);
	}

	let ps = [];
	for (sql of sqls) {
		ps.push(new Promise(function(resolve, reject) {
			db.query(sql, function(err, rows) {
				if(err) {
					reject(err);
				}
				resolve(rows);
			})
		}))
	}

	let p = Promise.all(ps);
	p.then(function(out) {
		res.json({
			status: 1,  
			categories: out[0],
			items: out[1],
			total: out[2][0]['total']
		});
	}).catch(function(err) {
		console.log(err);
		res.json({"status": 0, "message": ''});
	})
}