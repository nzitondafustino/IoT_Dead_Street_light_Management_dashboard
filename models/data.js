const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dataSchema = new schema({
    voltage:String,
    current:String,
    brightness:String,
    condition:Boolean
});

const Data = mongoose.model('Data',dataSchema);

module.exports = Data;