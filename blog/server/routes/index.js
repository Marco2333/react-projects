var db = require('../db.js');
var path = require('path');
var express = require('express');

var router = express.Router();

/* GET home page. */
router.all('/get', function(req, res, next) {
    // res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
    let {current, count, type} = req.query;
    // if 

    let sql = "select * from blog"
    db.query(sql, function(err, rows) {
        console.log(rows);
        res.json({"status": 1, "articals": rows});
    })
    // console.log(1234);
    // res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});

router.get('*', function(req, res, next) {
	res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});

module.exports = router;
