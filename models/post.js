var BaseModel = require('../libs/baseModel.js');
var model  = new BaseModel();

var _Schema = new model.Schema({
    user_id:String,
    nickname:String,
    company_id:String,
    title: String,
    author:String,
    cover:String,
    content: String,
    category:String,
    status:String,
    created: String,
    modified:String,
},{versionKey: false});

model.schema =  model.mongoose.model('posts', _Schema);

module.exports = model;