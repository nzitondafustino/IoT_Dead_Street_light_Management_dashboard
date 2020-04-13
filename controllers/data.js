//importing device model
const Data = require('../models/data')

exports.updateMcData = async function(req,res,next){
  const data = new Data(req.body);
  await data.save();
  console.log("done");
  return res.status(200).json(data);
}