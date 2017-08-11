var express = require('express');
var router = express.Router();

/* GET home page. */

const maps = {
    'login' : '登录',
    'register' : '注册',
    'index': '首页'
};
router.get('/', function(req, res, next) {
    if (req.session.user) {
    }else {
        // res.render('error', {message: 'false' ,error: {status: '304', stack: 'false'}})
        res.render('index', { title: '登录', type: 'login'});
    }
});


router.get('/:type', function(req, res, next) {
    res.render('index', { title: maps[req.params.type], type: req.params.type});
});


// router.get('/register', function(req, res, next) {
//     res.render('index', { title: '注册' });
// });

module.exports = router;
