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

router.get('/get-artical-list', function(req, res, next) {
    let {current = 1, count = 10, type = 0} = req.query;
    let sql = "";
    let field = "blog.id, title, body, tag, created_at, views, theme";

    if(type == 0) {
        sql = `select ${field} from blog join category on blog.category = category.id where blog.status = 1
        order by created_at desc limit ${(current - 1) * count}, ${count}`;
    } else{
        sql = `select ${field} from blog join category on blog.category = category.id
         where type = ${+type} and blog.status = 1 order by created_at desc limit ${(current - 1) * count}, ${count}`;
    }
    db.query(sql, function(err, rows) {
        let out = []
        for(i in rows) {
            item = rows[i];
            out.push({
                'id': item.id,
                'title': item.title,
                'tag': item.tag,
                'abstract': escape2Html(item.body.replace(/<\/?[^>]+(>|$)/g, "")).substr(0, 150),
                'created_at': item.created_at,
                'views': item.views,
                'theme': item.theme
            })
        }

        if(type == 0) {
            db.query("select count(*) as total from blog", function(err, rows) {
                res.json({"status": 1, "articals": out, "total": rows[0]['total']});
            })
        } else {
            res.json({"status": 1, "articals": out});
        }
    })
});

router.get('/get-navside-info', function(req, res, next) {
    let sqls = [
        "select value from config where (name = 'intro' or name = 'view_count') and status = 1",
        "select id, title from blog order by created_at desc limit 10",
        "select id, theme from category where status = 1",
        "select id, text, url from link where status = 1",
        "select distinct tag from blog where status = 1 order by created_at desc limit 15",
        "select count(*) as count from blog where status = 1"
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
                'intro': out[0][1]['value'],
                'viewCount': out[0][0]['value'],
                'articalCount': out[5][0]['count']
            },
            articals: out[1],
            categorys: out[2],
            links: out[3],
            tags: tags
        };
        res.json({"status": 1, "infos": infos});

    }).catch(function(err) {
        res.json({"status": 0, "message": ''});
    })
});

router.get('/get-artical-detail/:id', function(req, res, next) {
    let {id} = req.params;
    
    let sql = `select blog.id, title, body, tag, theme, category, created_at, updated_at, 
    type, views from blog join category on blog.category = category.id where blog.id = ${id} and blog.status = 1`;

    db.query(sql, function(err, rows) {
        if(err) {
            res.json({"status": 0, "message": err});
        }

        res.json({"status": 1, "infos": rows ? rows[0] : {}});
    })
});

router.get('/get-timeline', function(req, res, next) {

    let sqls = [
        "select id, theme from category where status = 1"
    ];

    let {current = 1, count = 30, category = 0} = req.query;
    
    let sql = "";
    let field = "blog.id, title, created_at";

    if(category == 0) {
        sql = `select ${field} from blog where blog.status = 1
            order by created_at desc limit ${(current - 1) * count}, ${count}`;
        sqls.push(sql);

        sql = 'select count(*) as total from blog where status = 1';
        sqls.push(sql);
    } else{
        sql = `select ${field} from blog where category = ${+category} and blog.status = 1 
            order by created_at desc limit ${(current - 1) * count}, ${count}`;
        sqls.push(sql);

        sql = `select count(*) as total from blog where status = 1 and category = ${+category}`;

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
        let infos = {
            categorys: out[0],
            items: out[1],
            total: out[2][0]['total'],
        };
        res.json({"status": 1, "infos": infos});
    }).catch(function(err) {
        console.log(err);
        res.json({"status": 0, "message": ''});
    })
});

router.get('/search', function(req, res, next) {
    let {current = 1, count = 15, keyword} = req.query;

    if(keyword == '') {
       res.json({"status": 1, "articals": []}); 
    }

    let field = "blog.id, title, body, tag, created_at, views, theme";
    let sql = `select ${field} from blog join category on blog.category = category.id where blog.status = 1 and (body like '%${keyword}%' or title like 
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

            db.query(`select count(*) as total from blog where blog.status = 1 and (body like '%${keyword}%' or title like 
             '%${keyword}%' or tag like '%${keyword}%')`, function(err, rows) {
                res.json({"status": 1, "articals": out, "total": rows[0]['total']});
            })
        }
    })
});


router.get('/get-category', function(req, res, next) {

    let {current = 1, count = 30, category = 0} = req.query;
    
    let sqls = [];
    let sql = "";
    let field = "blog.id, title, body, tag, created_at, views, theme";

    if(category == 0) {
        sql = `select ${field} from blog join category on blog.category = category.id where blog.status = 1
            order by created_at desc limit ${(current - 1) * count}, ${count}`;
        sqls.push(sql);

        sql = 'select count(*) as total from blog where status = 1';
        sqls.push(sql);
    } else{
        sql = `select ${field} from blog join category on blog.category = category.id where category = ${+category} and blog.status = 1 
            order by created_at desc limit ${(current - 1) * count}, ${count}`;
        sqls.push(sql);

        sql = `select count(*) as total from blog where status = 1 and category = ${+category}`;

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
        let aritcals = []
        for(i in out[0]) {
            item = out[0][i];
            aritcals.push({
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
            articals: aritcals,
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
    let field = "blog.id, title, body, tag, created_at, views, theme";
    let sql = `select ${field} from blog join category on blog.category = category.id where blog.status = 1 
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
        res.json({"status": 1, "articals": out});
    })
});

router.get('*', function(req, res, next) {
	res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});

module.exports = router;