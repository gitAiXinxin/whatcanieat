var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Food = new Schema({
    img:String,
    name:String,
    info:String,
    updateDate:String,
    fat:Number,
    pv:Number,//观看数
    protein:Number,
    carbo:Number,
    energy:Number
});

module.exports = mongoose.model('Food', Food);