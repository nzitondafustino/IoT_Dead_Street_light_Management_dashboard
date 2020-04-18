//importing device model
const Data = require('../models/data')

exports.updateMcData = async function(req,res,next){
  const data = req.query.data.split('*')
  const serialNumber = data[0]
  const voltage = data[1];
  const current = data[2];
  const brightness = data[3];
  const condition =data[4];
  const values = new Data({
    serialNumber:serialNumber,
    voltage:voltage,
    current:current,
    brightness:brightness,
    condition:condition
  });
  await values.save();
  res.io.emit("data",values)
  return res.status(200).json(values);
}