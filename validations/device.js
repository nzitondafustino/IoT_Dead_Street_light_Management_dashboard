const { check, validationResult } = require('express-validator');

const Device = require('../models/device');

exports.addDevice = [
 check('SN').isNumeric()
 .withMessage("SN must be numeric")
 .isLength({min:5})
 .withMessage("Invalid SN")
 .custom(SN=>{
   Device.findOne({SN:SN})
   .then(device=>{
       if(device){
           return Promise.reject('Device already exist')
       }
   })
 }),
 check('phone').isLength({min:10,max:10})
 .withMessage("phone number must exactly equal to 10 digits"),
 check('location').isAlpha()
 .withMessage('location must be alphabetic'),
 check('road').isLength({min:3})
 .withMessage('road must be at least 3 characters'),
 check('lamp_number').isNumeric()
 .withMessage('must be a numerical value')
]