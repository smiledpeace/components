var BaseModel = require('../libs/baseModel.js');
var model  = new BaseModel();

var _Schema = new model.Schema({
    token: String,
    created: String,
    name: String,
    password: String,
    modified: String
},{versionKey: false});

model.schema =  model.mongoose.model('users', _Schema);

module.exports = model;