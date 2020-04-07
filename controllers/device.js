
//import validation errors
const { validationResult } = require('express-validator');

//import validation


const Device = require('../models/device');

exports.dashboard = async function(req,res,next){
    const devices = await Device.find({activated:true});
    res.render('pages/dashboard',{title:"Dashboard",devices:devices});
} 
exports.getAddDevice = function(req,res,next){
    res.render('pages/add-device',{title:"New Device"});
}
exports.postAddDevice = async function(req,res,next){
    //validating data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.render('pages/add-device',{title:"New Device",errors:errors});
      }
    //populating req.body into device
    const device = new Device({
        SN:req.body.SN,
        phone:req.body.phone,
        location:req.body.location,
        road:req.body.road,
        lampNumber:req.body.lamp_number
    });
     //saving device int a database
     await device.save();
     //redirecting to dashboard after saving device into a database
     res.redirect('/admin/dashboard');
}
exports.updateDevice = async function(req,res,next){
    var serialNumber = req.params.SN;
    const device = await Device.findOne({SN:serialNumber});
    device.SN = req.body.SN;
    device.phone = req.body.phone;
    device.location = req.body.location;
    device.road = req.body.road;
    device.lampNumber = req.body.lamp_number;
    await device.save();
    res.redirect('/admin/dashboard');
}
exports.deleteDevice = async function(req,res,next){
    var serialNumber = req.params.SN;
    await Device.findOneAndDelete({SN:serialNumber});
    res.redirect('/admin/dashboard');
    
}