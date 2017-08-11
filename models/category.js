var BaseModel = require('../libs/baseModel.js');
var model  = new BaseModel();

var _Schema = new model.Schema({
    category:String,
    company_id:String,
    created: String,
    modified:String
},{versionKey: false});

model.schema =  model.mongoose.model('categorys', _Schema);

module.exports = model;