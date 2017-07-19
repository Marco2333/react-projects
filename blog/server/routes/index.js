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

/* GET home page. */
router.get('/get-artical-list', function(req, res, next) {
    let {current = 1, count = 10, type = 0} = req.query;
    // if 
    let sql = "";
    let field = "blog.id, title, body, tag, created_at, views, theme";

    if(type == 0) {
        sql = `select ${field} from blog join category on blog.category = category.id where blog.status = 1
        order by created_at desc limit ${(current - 1) * count}, ${count}`;
    } else{
        sql = `select ${field} from blog join category on blog.category = category.id
         where type = ${+type} and status = 1 order by created_at desc limit ${(current - 1) * count}, ${count}`;
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
        res.json({"status": 1, "articals": out});
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

router.get('*', function(req, res, next) {
	res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});

module.exports = router;
