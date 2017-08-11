var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var utils = require('./libs/utils.js');

var redisConfig = require(utils.configDir + '/config.json').redis;

var index = require('./routes/index');
var users = require('./routes/users');

var queryRoutes = require('./routes/query');
//配置文件
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(redisConfig.secret));
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: redisConfig.secret,
    // store: new RedisStore({
    //     host: redisConfig.host,
    //     port: redisConfig.port,
    //     ttl: redisConfig.ttl
    // }),
    cookie: {maxAge: redisConfig.ttl, secure: false},
    resave: true,
    saveUninitialized: true
}));


app.use('/', index);
app.use('/users', users);
app.use('/query/', queryRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
