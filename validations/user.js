//importing express validator
const { check, validationResult } = require('express-validator');

const User = require('../models/user');

exports.addUser=[
    check('first_name')
    .isAlpha()
    .withMessage("Must be alphabet")
    .isLength({min:3})
    .withMessage("Must have minimum 3 characters"),
    check('last_name')
    .isAlpha()
    .withMessage("Must be alphabet")
    .isLength({min:3})
    .withMessage("Must have minimum 3 characters"),
    check('email').isEmail().withMessage("Must be Real email")
    .custom(email=>{
        return User.findOne({email:email})
        .then((user)=>{
            if(user){
                return Promise.reject("E-mail already inuse")
            }
        })
    }),
    check('password').isLength({min:4})
    .custom((password,{req})=>{
        if(password !== req.body.confirm_password)
        {
            return Promise.reject("Password does not match");
        }
    })
    .withMessage("Password must be at least 4 characters")
]
exports.updateUser=[
    check('first_name')
    .isAlpha()
    .withMessage("Must be alphabet")
    .isLength({min:3})
    .withMessage("Must have minimum 3 characters"),
    check('last_name')
    .isAlpha()
    .withMessage("Must be alphabet")
    .isLength({min:3})
    .withMessage("Must have minimum 3 characters"),
    check('email').isEmail().withMessage("Must be Real email")
    .custom(email=>{
        return User.find({email:email})
        .then((users)=>{
            if(users.length > 1){
                return Promise.reject("E-mail already in use")
            }
        })
    }),
    check('password').optional({checkFalsy:true}).isLength({min:4})
    .custom((password,{req})=>{
        if(password != req.body.confirm_password){
            return Promise.reject("Password does not match");
        }
    })
]