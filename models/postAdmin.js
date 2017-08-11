var BaseModel = require('../libs/baseModel.js');
var model  = new BaseModel();

var _Schema = new model.Schema({
    company_id:String,
    user_id:String,
    created:String,
    modified:String,
},{versionKey: false});

model.schema =  model.mongoose.model('post_admins', _Schema);

module.exports = model;