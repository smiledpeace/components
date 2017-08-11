var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var Category = require('../models/category');
var PostAdmin = require('../models/postAdmin');
var Users = require('../models/users');
var moment = require('moment');
require('../libs/mongodb');
var fs = require('fs');
var path = require('path');
var now = moment().format('YYYY-MM-DD HH:mm:ss');
const STATUS = {
    draft: "草稿",
    publish: "已发布",
    deleted: "已删除"
};


router.post('/getAllList', function (req, res) {
    var company_id = req.body.company_id;
    var limit = req.body.limit ? parseInt(req.body.limit) : 50;
    var page = req.body.page ? parseInt(req.body.page) : 1;
    var skip = limit * ( page - 1);
    if (req.session.user) {
        Post.schema.find({company_id: company_id}).sort({created: -1}).select('title author cover category status created').skip(skip).limit(limit).execAsync()
            .then(posts => {
                res.send({"result": "TRUE", "data": posts});
            })
    }else {
        res.send('{"result":"FALSE","msg":"no auth"}');
    }
    console.log(req.session);
});


router.post('/addPost', function (req, res) {
    var company_id = req.body.company_id;
    console.log(req.body);
    if (req.session) {
        PostAdmin.schema.findOne({title: 'test'}).execAsync()
            .then(admin => {
                var postData = new Post.schema({
                    company_id: req.body.company_id,
                    title: req.body.title,
                    author: req.body.author,
                    cover: '',
                    content: req.body.content,
                    category: req.body.category,
                    status: req.body.status,
                    created: now,
                    modified: now
                });
                return postData.save();
            })
            .then((postData) => {
                res.send(`{"result":"TRUE","data":"${postData._id.toString()}"}`);
            })
            .catch(ex => {
                console.log(ex);
                if (ex.code && ex.message) {
                    res.send(`{"result":"FALSE","msg":${ex.message}}`);
                } else {
                    res.send(`{"result":"FALSE"}`);
                }
            });
    } else {
        res.send('{"result":"FALSE","msg":"no auth"}');
    }
});


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

module.exports = router;
