var path = require('path');
var express = require('express');

var db = require('../db.js');

var router = express.Router();


router.get('*', function(req, res, next) {
    res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});

module.exports = router;
