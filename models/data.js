const mongoose = require('mongoose');

const Device = require('../models/device')

const schema = mongoose.Schema;

const dataSchema = new schema({
    serialNumber:String,
    voltage:String,
    current:String,
    brightness:String,
    condition:Boolean,
    created:{
        type:Date,
        default:new Date()
    },
    updated:{
        type:Date,
        default:new Date()
    },
    device: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Device'
    }
});

const Data = mongoose.model('Data',dataSchema);

module.exports = Data;