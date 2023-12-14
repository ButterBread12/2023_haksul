const mongoose = require('mongoose');

var LoginSchema = mongoose.Schema({   //스키마(Schema) 설정
    Id: {type: Number, require:true},
    username: {type: String, require:true},
    password: { type: String, require: true},
    description: { type: String, require: true},
    register_date: { type: Date, default:Date.now}
});

module.exports = mongoose.model('Login', LoginSchema); //소문자화 후 복수형으로 바꾸어 devices 컬렉션이 됨
