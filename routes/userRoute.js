const express = require('express');
const router = express.Router();
const IsLoggedin = require("../middleware/IsLoggedin");
const {registerUser,LoginUser,LogOut} = require("../controller/authcontroller");

router.get('/login', (req, res) => {
    res.render("index",{showNavbar: false}); // Assuming your index.ejs handles both login and register
});

router.get('/register', (req, res) => {
    res.render("index",{showNavbar: false}); // Assuming your index.ejs handles both login and register
});



router.post('/register',registerUser);

router.post('/login',LoginUser);

router.get('/logout',LogOut);


module.exports = router;