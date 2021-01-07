const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
//importing device model
const Data = require('../models/data')
const Device = require('../models/device');

exports.updateMcData = async function(req,res,next){

  const values = req.query.data.split('*')
  const serialNumber = values[0]
  const voltage = values[1];
  const current = values[2];
  const brightness = values[3];
  const condition = values[4];
  //verifying serial number of the lamp
  const device = await Device.findOne({SN:serialNumber});
  if(!device){
    return res.status(401).json({msg:"unAuthorized access"});
  }
  const data = new Data({
    serialNumber:serialNumber,
    voltage:voltage,
    current:current,
    brightness:brightness,
    condition:condition,
    created: new Date().toISOString(),
    device:device._id
  });

  await data.save()
   if(device.activated == false){
    device.activated = true
   }
   
  device.data.push(data._id)
  await device.save()

  res.io.emit("data",data)
  return res.status(200).json(data);
}
exports.exportData = async function(req,res,next){
  const data = await Data.find();
  res.render('pages/export',{title:"Export Data",data:data});
}
exports.getExportData = async function(req,res,next){

  const initialDate = fomateDate(req.body.start);
  const finalDate = fomateDate(req.body.end);
  
  const data = await Data.find({})
                          .where('created').gte(initialDate)
                          .where('created').lte(finalDate);
  const csvData = [];
  data.forEach(d =>{
    const columnData = {
    SN:d.serialNumber,
    voltage:d.voltage,
    current:d.current,
    brightness:d.brightness,
    Date:new Date(d.created).toISOString()
    };
    csvData.push(columnData);
  });
  const csv = new ObjectsToCsv(csvData);
  await csv.toDisk('./data.csv');

  return res.download('./data.csv',()=>{
    fs.unlinkSync('./data.csv');
  });
}
function fomateDate(stringDate){
  newDate = new Date(stringDate);
  return newDate;
}