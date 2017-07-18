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
        sql = `select ${field} from blog join category on blog.category = category.id 
        order by created_at desc limit ${(current - 1) * count}, ${count}`;
    } else{
        sql = `select ${field} from blog join category on blog.category = category.id
         where type = ${+type} order by created_at desc limit ${(current - 1) * count}, ${count}`;
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

router.get('*', function(req, res, next) {
	res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});

module.exports = router;
