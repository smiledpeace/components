var mongoose = require('mongoose');
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);
var util = require('./utils.js');

var mongoConfig = require(util.configDir + '/mongodbConfig.json').dataServer;
var connectStr = 'mongodb://';
// if (mongoConfig.replication) {
//     if (mongoConfig.user) {
//         connectStr += connectStr + mongoConfig.user + ':' + mongoConfig.pwd + '@';
//     }
//     mongoConfig.servers.forEach((server)=> {
//         connectStr += server.host + ':' + server.port + ',';
//     });
//     connectStr = connectStr.substring(0, connectStr.length - 1);
//     connectStr += '/' + mongoConfig.db + '?replicaSet=' + mongoConfig.replication;
// } else {
//     if (mongoConfig.user) {
//         connectStr += connectStr + mongoConfig.user + ':' + mongoConfig.pwd + '@' + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.db;
//     } else {
//     }
// }
connectStr += mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.db;

console.log(connectStr);
mongoose.connect(connectStr, {useMongoClient:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;