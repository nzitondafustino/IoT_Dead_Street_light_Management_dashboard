//importing device model
const Data = require('../models/data')
const Device = require('../models/device');

exports.updateMcData = async function(req,res,next){

  const values = req.query.data.split('*')
  const serialNumber = values[0]
  const voltage = values[1];
  const current = values[2];
  const brightness = values[3];
  const condition =values[4];
  //verifying serial number of the lamp
  const device = await Device.findOne({SN:serialNumber});
  if(!device){
    return res.status(401).json({msg:"unAuthorized access"});
  }
  console.log('Serial number',device);

  const data = new Data({
    serialNumber:serialNumber,
    voltage:voltage,
    current:current,
    brightness:brightness,
    condition:condition,
    device:device._id
  });

  await data.save()
   if(device.activated == false){
    device.activated = true
   }
  device.data.push(data)
  await device.save()

  res.io.emit("data",data)
  console.log(res.io)
  return res.status(200).json(data);
}