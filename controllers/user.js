//importing user Model
const User = require('../models/user');

//import validation errors
const { validationResult } = require('express-validator');

exports.getAddUser = function(req,res,next){

    res.render('pages/add-user',{title:"New User"});
}
exports.allUser = async function(req,res,next){
    const users = await User.find();
    res.render('pages/all-users',{title:"All Users",users:users});
}
exports.postAddUser = async function(req,res,next){
    //validating incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //console.log(errors);
        return res.render('pages/add-user',{title:"New User",errors:errors});
      }
    //populating user with incomimg requwest user
    const user = new User({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email :req.body.email,
        role:req.body.role,
        password: req.body.password
    })
    //saving user int a database
    await user.save();
    //redirecting to all user after saving
    res.redirect('/admin/all-users');
}
exports.updateUser = async function(req,res,next){
 var id = req.params.id;
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
     console.log(errors);
     const users = await User.find();
     return res.render('pages/all-users',{title:"All Users",users:users,errors:errors});
   }
 const device = await User.findByIdAndUpdate(id,req.body,{new:true});
 res.redirect('/admin/all-users');
}
exports.deleteUser = async function(req,res,next){
    var id = req.params.id; 
    await User.findByIdAndDelete(id);
    res.redirect('/admin/all-users');
}
