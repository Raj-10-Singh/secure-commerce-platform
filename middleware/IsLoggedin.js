const usermodel = require('../models/user-model');
const jwt = require("jsonwebtoken");



module.exports.IsLoggedin = async(req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error","you need to login first");
        return res.redirect("/user/login");
    }
    try{
        let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user = await usermodel
            .findOne({email:decoded.email})
            .select("-password");
        req.user = user;
        next();
    }
    catch(err){
        req.flash("error","something went wrong");
        res.redirect("/user/login");
    }
}