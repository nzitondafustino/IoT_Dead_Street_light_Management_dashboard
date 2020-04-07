const express=require('express');

const router = express.Router();
//importing controllers

const deviceController = require('../controllers/device');

const userController = require('../controllers/user');

//importing  user validation
const userValidations = require('../validations/user');

const deviceValidations = require('../validations/device');

router.get('/dashboard',deviceController.dashboard);

router.post('/add-user',userValidations.addUser,userController.postAddUser);

router.post('/update-user/:id',userValidations.updateUser,userController.updateUser);

router.post('/delete-user/:id',userController.deleteUser);

router.get('/add-user',userController.getAddUser);

router.get('/all-users',userController.allUser);

router.get('/add-device',deviceController.getAddDevice);

router.post('/update-device/:SN',deviceController.updateDevice);

router.post('/delete-device/:SN',deviceController.deleteDevice);

router.post('/add-device',deviceValidations.addDevice,deviceController.postAddDevice);

module.exports = router;