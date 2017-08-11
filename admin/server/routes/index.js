var path = require('path');
var express = require('express');

var user = require('../controller/user');
var db = require('../db.js');

var router = express.Router();

router.get('/toLogin', user.toLogin);

router.get('*', function(req, res, next) {
    res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});

module.exports = router;
