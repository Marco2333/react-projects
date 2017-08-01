var db = require('../db.js');
var path = require('path');
var express = require('express');

var router = express.Router();

function escape2Html(str) {
    var arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t];
    });
}

router.get('/get-articles', function(req, res, next) {
	let {current, count, type, category, keyword, tag} = req.query;

	let field = "article.id, title, body, tag, created_at, views, theme";
	let sql = `select ${field} from article join category on article.category = category.id`,
		condition = " where article.status = 1",
		totalSql = '';

	if(tag != null) {
		condition += ` and tag like '%${tag}%'`;
	}
	if(keyword != null && keyword.trim() !== '') {
		condition += ` and (body like '%${keyword}%' or title like 
        '%${keyword}%' or tag like '%${keyword}%')`;
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
			sql += ` limit ${(current - 1) * count}, ${count}`;
			totalSql += "select count(*) as total from article" + condition;
		}
		else {
			sql += ` limit ${count}`;
		}
	}
	
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
					'abstract': escape2Html(item.body.replace(/<\/?[^>]+(>|$)/g, "")).substr(0, 130),
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
})


router.get('/get-article-list', function(req, res, next) {
    let {current = 1, count = 10, type = 0} = req.query;
    let sql = "";
    let field = "article.id, title, body, tag, created_at, views, theme";

    if(type == 0) {
        sql = `select ${field} from article join category on article.category = category.id where article.status = 1
        order by created_at desc limit ${(current - 1) * count}, ${count}`;
    } else{
        sql = `select ${field} from article join category on article.category = category.id
         where type = ${+type} and article.status = 1 order by created_at desc limit ${(current - 1) * count}, ${count}`;
    }
    db.query(sql, function(err, rows) {
        let out = []
        for(i in rows) {
            item = rows[i];
            out.push({
                'id': item.id,
                'title': item.title,
                'tag': item.tag,
                'abstract': escape2Html(item.body.replace(/<\/?[^>]+(>|$)/g, "")).substr(0, 130),
                'created_at': item.created_at,
                'views': item.views,
                'theme': item.theme
            })
        }

        if(type == 0) {
            db.query("select count(*) as total from article", function(err, rows) {
                res.json({"status": 1, "articles": out, "total": rows[0]['total']});
            })
        } else {
            res.json({"status": 1, "articles": out});
        }
    })
});

router.get('/get-navside-info', function(req, res, next) {
    let sqls = [
        "select value from config where (name = 'intro' or name = 'view_count') and status = 1",
        "select id, title from article order by created_at desc limit 10",
        "select id, theme from category where status = 1",
        "select id, text, url from link where status = 1",
        "select distinct tag from article where status = 1 order by created_at desc limit 15",
        "select count(*) as count from article where status = 1"
    ];

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
        let tags = [];
        
        for (item of out[4]) {
            tags.push(...(item['tag'].trim().replace(/\s/, ' ').split(" ")))
        }

        tags = [... new Set(tags)];

        let infos = {
            portrait: {
                'intro': out[0][0]['value'],
                'viewCount': out[0][1]['value'],
                'articleCount': out[5][0]['count']
            },
            articles: out[1],
            categories: out[2],
            links: out[3],
            tags: tags
        };
        res.json({
			status: 1, 
			portrait: {
                'intro': out[0][0]['value'],
                'viewCount': out[0][1]['value'],
                'articleCount': out[5][0]['count']
            },
            articles: out[1],
            categories: out[2],
            links: out[3],
			tags: tags
		});

    }).catch(function(err) {
        res.json({"status": 0, "message": ''});
    })
});

router.get('/get-article-detail/:id', function(req, res, next) {
    let {id} = req.params;
    
    let sql = `select article.id, title, body, tag, theme, created_at, updated_at, 
    type, views from article join category on article.category = category.id where article.id = ${id} and article.status = 1`;

    db.query(sql, function(err, rows) {
        if(err) {
            res.json({"status": 0, "message": err});
        }
	
        res.json({"status": 1, "_info": rows ? rows[0] : {}});
    })
});

router.get('/get-timeline', function(req, res, next) {

    let sqls = [
        "select id, theme from category where status = 1"
    ];

    let {current = 1, count = 30, category = 0} = req.query;
    
    let sql = "";
    let field = "article.id, title, created_at";

    if(category == 0) {
        sql = `select ${field} from article where article.status = 1
            order by created_at desc limit ${(current - 1) * count}, ${count}`;
        sqls.push(sql);

        sql = 'select count(*) as total from article where status = 1';
        sqls.push(sql);
    } else{
        sql = `select ${field} from article where category = ${+category} and article.status = 1 
            order by created_at desc limit ${(current - 1) * count}, ${count}`;
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
			"status": 1,  
			categories: out[0],
            items: out[1],
			total: out[2][0]['total']
		});
    }).catch(function(err) {
        console.log(err);
        res.json({"status": 0, "message": ''});
    })
});

router.get('/search', function(req, res, next) {
    let {current = 1, count = 15, keyword} = req.query;

    if(keyword == '') {
       res.json({"status": 1, "articles": []}); 
    }

    let field = "article.id, title, body, tag, created_at, views, theme";
    let sql = `select ${field} from article join category on article.category = category.id where article.status = 1 and (body like '%${keyword}%' or title like 
        '%${keyword}%' or tag like '%${keyword}%') order by created_at desc limit ${(current - 1) * count}, ${count}`;
    
    db.query(sql, function(err, rows) {
        if(err) {
            res.json({"status": 0, "message": ''});
        }
        else {
            let out = []
            for(i in rows) {
                item = rows[i];
                out.push({
                    'id': item.id,
                    'title': item.title,
                    'tag': item.tag,
                    'abstract': escape2Html(item.body.replace(/<\/?[^>]+(>|$)/g, "")).substr(0, 130),
                    'created_at': item.created_at,
                    'views': item.views,
                    'theme': item.theme
                })
            }

            db.query(`select count(*) as total from article where article.status = 1 and (body like '%${keyword}%' or title like 
             '%${keyword}%' or tag like '%${keyword}%')`, function(err, rows) {
                res.json({"status": 1, "articles": out, "total": rows[0]['total']});
            })
        }
    })
});


router.get('/get-category', function(req, res, next) {

    let {current = 1, count = 30, category = 0} = req.query;
    
    let sqls = [];
    let sql = "";
    let field = "article.id, title, body, tag, created_at, views, theme";

    if(category == 0) {
        sql = `select ${field} from article join category on article.category = category.id where article.status = 1
            order by created_at desc limit ${(current - 1) * count}, ${count}`;
        sqls.push(sql);

        sql = 'select count(*) as total from article where status = 1';
        sqls.push(sql);
    } else{
        sql = `select ${field} from article join category on article.category = category.id where category = ${+category} and article.status = 1 
            order by created_at desc limit ${(current - 1) * count}, ${count}`;
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
        // console.log(out);
        let articles = []
        for(i in out[0]) {
            item = out[0][i];
            articles.push({
                'id': item.id,
                'title': item.title,
                'tag': item.tag,
                'abstract': escape2Html(item.body.replace(/<\/?[^>]+(>|$)/g, "")).substr(0, 130),
                'created_at': item.created_at,
                'views': item.views,
                'theme': item.theme
            })
        }
        let infos = {
            articles: articles,
            total: out[1][0]['total']
        };
        res.json({"status": 1, "infos": infos});
    }).catch(function(err) {
        console.log(err);
        res.json({"status": 0, "message": ''});
    })
});

router.get('/get-tag', function(req, res, next) {
    let {tag} = req.query;
    let field = "article.id, title, body, tag, created_at, views, theme";
    let sql = `select ${field} from article join category on article.category = category.id where article.status = 1 
        and tag like '%${tag}%' order by created_at desc`;
    
    db.query(sql, function(err, rows) {
        let out = []
        for(i in rows) {
            item = rows[i];
            out.push({
                'id': item.id,
                'title': item.title,
                'tag': item.tag,
                'abstract': escape2Html(item.body.replace(/<\/?[^>]+(>|$)/g, "")).substr(0, 130),
                'created_at': item.created_at,
                'views': item.views,
                'theme': item.theme
            })
        }
        res.json({"status": 1, "articles": out});
    })
});

router.get('/get-note', function(req, res, next) {
    let {current = 1, count = 15} = req.query;
    let field = "id, title, detail, tag, created_at";
    let sql = `select ${field} from gather where status = 1 order by created_at desc limit ${(current - 1) * count}, ${count}`;
    
    db.query(sql, function(err, rows) {
        if(err) {
            res.json({"status": 0, "message": ''});
        }
        else {
            db.query('select count(*) as total from gather where status = 1 ', function(err, t) {
                res.json({"status": 1, "notes": rows, "total": t[0]['total']});
            })
        }
    })
});


router.get('/get-gossip', function(req, res, next) {
    let {current = 1, count = 30} = req.query;
    let sql = `select * from gossip order by created_at desc limit ${(current - 1) * count}, ${count}`;
    
    db.query(sql, function(err, rows) {
		console.log(rows);
        if(err) {
            res.json({"status": 0, "message": ''});
        }
        else {
            db.query('select count(*) as total from gossip', function(err, t) {
                res.json({"status": 1, "gossips": rows, "total": t[0]['total']});
            })
        }
    })
});


router.get('/article-detail/:id', function(req, res, next) {
	res.sendfile(path.join(__dirname, '../../public/detail.html')); // 发送静态文件
});


router.get('*', function(req, res, next) {
	res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});

module.exports = router;