var express = require('express');
var router = express.Router();
// var io = require('socket.io');
/* GET home page. */

const maps = {
    'login' : '登录',
    'register' : '注册',
    'index': '首页',
    'filp': '翻页'
};

router.get('/', function(req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    }else {
        res.redirect('/index');
    }
})

router.get('/:type', function(req, res, next) {
    if (!req.session.user && req.params.type === 'index') {
        res.redirect('/login');
    }else {
        res.render('index', { title: maps[req.params.type], type: req.params.type, param1: ''});
    }
});

router.get('/:type/:param1', function(req, res, next) {
    if (!req.session.user && req.params.type === 'index') {
        res.redirect('/login');
    }else {
        res.render('index', { title: maps[req.params.type], type: req.params.type, param1: req.params.param1});
    }
});

module.exports = router;
