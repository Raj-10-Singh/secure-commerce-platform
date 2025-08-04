const express = require('express');
const router = express.Router();
const {IsLoggedin} = require("../middleware/IsLoggedin");
const { LoginAdmin, registerAdmin } = require('../controller/authcontroller');

router.get('/admin',IsLoggedin,(req,res)=>{
    let success = req.flash("success");
    res.render("createproducts",{success});
});

// GET Routes
router.get('/login', (req, res) => {
    res.render('owner-login', { error: req.flash('error') });
});

router.get('/register', (req, res) => {
    res.render('owner-register', { error: req.flash('error') });
});


router.post('/register',registerAdmin);

router.post('/login',LoginAdmin);


module.exports=router;