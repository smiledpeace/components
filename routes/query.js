var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var Category = require('../models/category');
var PostAdmin = require('../models/postAdmin');
var Users = require('../models/users');
var Articles = require('../models/article');
var moment = require('moment');
var iconv = require('iconv-lite') ;
// 爬虫
var http = require('http');
var net = require('net');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var ep = new eventproxy();
// var pageUrl = 'http://gov.sina.com.cn/';
var pageUrl = 'http://www.bxwx9.org/b/24/24675/index.html';



require('../libs/mongodb');
var fs = require('fs');
var path = require('path');
var now = moment().format('YYYY-MM-DD HH:mm:ss');

var formidable = require("formidable")
var upload = require('../libs/fileuploads');
const STATUS = {
    draft: "草稿",
    publish: "已发布",
    deleted: "已删除"
};


router.post('/getAllList', function (reqRouter, resRouter) {
    var url = reqRouter.body.url || pageUrl;
    http.get(url, function (res) {
        var chunks = [];
        res.on('data', function(chunk) {
            chunks.push(chunk);
            // html += data;
        });
        res.on('end', function () {
            var decodedBody = '';
            if (url) {
                decodedBody = iconv.decode(Buffer.concat(chunks), 'utf-8');
            }else {
                decodedBody = iconv.decode(Buffer.concat(chunks), 'gbk');
            }
            callBack(decodedBody, reqRouter, resRouter);

        })
    })
    function callBack(html, reqRouter, resRouter) {
        //使用load方法，参数是刚才获取的html源代码数据
        var $ = cheerio.load(html, {decodeEntities: false});
        if (url === pageUrl) {
            var tags = $('.TabCss a');
            new Promise(function(resolve, reject) {
                var results = [];
                $(tags).each((index, item) => {
                    var title = $(item).text();
                    var url = $(item).attr('href');
                    results.push({url: `http://www.bxwx9.org/b/24/24675/${url}` , title});
                    resolve(results);
                })
            }).then(results => {
                resRouter.send({result: 'TRUE', data: results})
            });
        }else {
            // var tags = $('#articleContent .article p');
            new Promise(function(resolve, reject) {
                var tags = $('#content').contents().filter(function() {
                    return this.nodeType === 3;
                });
                var results = {
                    url,
                    title: reqRouter.body.title,
                    contents: []
                };
                $(tags).each((index, item) => {
                    var content = $(item).text();
                    results.contents.push({content});
                    // console.log(item.type);
                    // if (item.nodeType === '3') {
                    //     var content = $(item).text();
                    //     results.contents.push({content});
                    // }
                })
                resolve(results);
            }).then(results => {
                results.contents = encodeURIComponent(JSON.stringify(results.contents));
                // resRouter.send(`{"result":"TRUE","data":"${results}"}`);
                // console.log(results.contents);
                // return;
                if (reqRouter.session.user && reqRouter.session.user._id) {
                    Users.schema.findOne({_id: reqRouter.session.user._id}).execAsync()
                        .then(admin => {
                            if (admin) {
                                var article = new Articles.schema({
                                    company_id: reqRouter.body.company_id || '451231sdsf12231',
                                    user_id: reqRouter.session.user._id,
                                    title: results.title,
                                    url: results.url,
                                    content: results.contents,
                                    created: now,
                                    modified: now
                                });
                                return article.save();
                            }

                        })
                        .then((article) => {
                            resRouter.send(`{"result":"TRUE","data":"${article._id.toString()}"}`);
                        })
                        .catch(ex => {
                            if (ex.code && ex.message) {
                                resRouter.send(`{"result":"FALSE","msg":${ex.message}}`);
                            } else {
                                resRouter.send(`{"result":"FALSE"}`);
                            }
                        });
                } else {
                    resRouter.send('{"result":"FALSE","msg":"no auth"}');
                }
            });
        }

    }
});

router.post('/getAritcle', function (req, res) {
    let articleId = req.body.art_id;
    if (articleId) {
        Articles.schema.findOne({_id: articleId}).execAsync()
        .then(data => {
            res.send({result: 'TRUE', data});
        })
        .catch(ex => {
                if (ex.code && ex.message) {
                    res.send(`{"result":"FALSE","msg":${ex.message}}`);
                } else {
                    res.send(`{"result":"FALSE"}`);
                }
            });
    }else {
        res.send('{"result":"FALSE","msg":"params error"}');
    }
})
router.post('/login', function(req, res) {
    var user = req.body.nickname;
    var pwd = req.body.password;
    Users.schema.findOne({name: user}).execAsync()
        .then(data => {
            console.log(data);
            if (data) {
                Users.schema.findOne({password: pwd}).execAsync()
                    .then(data => {
                        if (data) {
                            req.session.user = {
                                _id: data._id,
                            };
                            res.send({result: 'TRUE'});
                        }else {
                            res.send({"result":"FALSE", "msg": '密码错误'});
                        }
                    })

            }else {
                res.send({"result":"FALSE", "msg": '用户不存在'});
            }
        })
        .catch(ex => {
            console.log(ex);
            if (ex.code && ex.message) {
                res.send(`{"result":"FALSE","msg":${ex.message}}`);
            } else {
                res.send(`{"result":"FALSE", "msg": '不存在'}, `);
            }
        });

});

router.post('/register', function(req, res) {
    var user = req.body.nickname;
    var pwd = req.body.password;
    console.log(user);
    Users.schema.findOne({name: user}).execAsync()
        .then(data => {
            console.log(data);
            if (data) {
                return 'have'
            }else {
                var new_users = new Users.schema({
                    token: '',
                    name: user,
                    password: pwd,
                    created: now,
                    modified: now
                });
                return new_users.save();
            }
        })
        .then(data => {
            if (data === 'have') {
                res.send({result: "false", msg: '用户已存在'});
            }else {
                res.send({result: "TRUE"});
            }
        })
        .catch(ex => {
            console.log(ex);
            if (ex.code && ex.message) {
                res.send(`{"result":"FALSE","msg":${ex.message}}`);
            } else {
                res.send(`{"result":"FALSE"}`);
            }
        })
});

console.log(upload.single);

router.post('/upload', function(req, res) {

    upload(req, res, function (err) {

        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });

    return;
    Users.schema.findOne({name: user}).execAsync()
        .then(data => {
            console.log(data);
            if (data) {
                return 'have'
            }else {
                var new_users = new Users.schema({
                    token: '',
                    name: user,
                    password: pwd,
                    created: now,
                    modified: now
                });
                return new_users.save();
            }
        })
        .then(data => {
            if (data === 'have') {
                res.send({result: "false", msg: '用户已存在'});
            }else {
                res.send({result: "TRUE"});
            }
        })
        .catch(ex => {
            console.log(ex);
            if (ex.code && ex.message) {
                res.send(`{"result":"FALSE","msg":${ex.message}}`);
            } else {
                res.send(`{"result":"FALSE"}`);
            }
        })
});

module.exports = router;
