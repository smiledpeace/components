var BaseModel = require('../libs/baseModel.js');
var model  = new BaseModel();

var _Schema = new model.Schema({
    user_id: String,
    nickname: String,
    company_id: String,
    title: String,
    content: String,
    url: String,
    created: String,
    modified: String,
},{versionKey: false});

model.schema =  model.mongoose.model('articles', _Schema);

module.exports = model;
