const express=require('express');
const router = express.Router();

//importing mcuco controller

const mcuController = require('../controllers/data');

const auth = require('../middlewares/isAuth');

router.get('/data',mcuController.updateMcData);
router.get('/export',auth.isAuth,mcuController.exportData);
router.post('/export',auth.isAuth,mcuController.getExportData);

module.exports = router;