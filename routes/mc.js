const express=require('express');
const router = express.Router();

//importing mcuco controller

const mcuController = require('../controllers/mc')

router.post('/mcu-data',mcuController.updateMcData);

module.exports = router;