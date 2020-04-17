const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dataSchema = new schema({
    voltage:String,
    current:String,
    brightness:String,
    condition:Boolean,
    created:{
        type:Date,
        default:Date.now()
    },
    updated:{
        type:Date,
        default:Date.now()
    }
});

const Data = mongoose.model('Data',dataSchema);

module.exports = Data;