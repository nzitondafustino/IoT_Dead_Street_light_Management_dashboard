const mongoose=require('mongoose');

const Data = require('../models/data')

const schema=mongoose.Schema;
const deviceSchema = new schema({
    SN : String,
    phone : String,
    voltage: Number,
    current :Number,
    brightness:Number,
    location:String,
    road:String,
    lampNumber:Number,
    activated:{
        type:Boolean,
        default:false
    },
    created:{
        type:Date,
        default:Date.now()
    },
    updated:{
        type:Date,
        default:Date.now()
    },
    data:[]

});
const device = mongoose.model('Device',deviceSchema);
//exporting model
module.exports=device;


