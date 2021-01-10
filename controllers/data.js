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
  const energy = values[5];
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
    energy:energy,
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
exports.getOfflineLamps = async(req,res,next)=>{
  const timout = 20 * 60 * 1000;
  var devices = await Device.find({activated:true}).populate({path:'data',options:
                                                                              {sort:{_id:-1}}});
      devices = devices.map(device=>{
      device.data = device.data.sort(function(a,b){
      return new Date(b.created) - new Date(a.created);
        });
        return {
          SN : device.SN,
          phone : device.phone,
          location:device.location,
          lastupdate:device.data.find(data=>{
            let lastElement = device.data.length
            return device.data[0]
        }).created
  }
});
    var offlines = devices.filter(device=>{

      return (new Date().getTime() - new Date(device.lastupdate).getTime() >= timout);
    })
    offlines = offlines.map(offline =>{
      return {
        SN:offline.SN,
        phone:offline.phone,
        location:offline.location,
        lastupdate:new Date(offline.lastupdate).toISOString()
      }
    })
    const csv = new ObjectsToCsv(offlines);
    await csv.toDisk('./offlineDevices.csv');

    return res.download('./offlineDevices.csv',()=>{
      fs.unlinkSync('./offlineDevices.csv');
    });
}
function fomateDate(stringDate){
  newDate = new Date(stringDate);
  return newDate;
}