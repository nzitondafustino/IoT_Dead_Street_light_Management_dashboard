const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dataSchema = new schema({
    data:String,
});

const Data = mongoose.model('Data',dataSchema);

module.exports = Data;