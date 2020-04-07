const express=require('express');
const router = express.Router();

router.get('/',function(req,res,next){
res.render('pages/landing',{title:"Login"});
})
router.post('/login',function(req,res,next){
    res.redirect('admin/dashboard');
    })
module.exports = router;