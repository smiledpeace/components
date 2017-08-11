var utils = {};

utils.checkEmail = function (email) {
    return email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
};
utils.checkPhone = function (phone) {
    return phone.match(/^1[3-8][0-9]\d{4,8}$/);
};
utils.checkUrl = function (str) {
    //在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
    var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    if (str.indexOf('localhost')) {
        str = str.replace('localhost', '127.0.0.1');
    }
    return objExp.test(str);

};

utils.env = (function () {
    return !process.env.NODE_ENV ? 'dev' : process.env.NODE_ENV;
})();

utils.configDir = (function () {
    var path = process.cwd() + '/config.dev';
    if (utils.env === 'production') {
        path = process.cwd() + '/config.production';
    }
    return path;
})();
utils.cleanCache = function (module) {
    var path = require.resolve(module);
    require.cache[path] = null;
};
module.exports = utils;