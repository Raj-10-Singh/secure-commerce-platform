const express = require('express');
const userModel = require('../models/user-model');
const generateToken = require('../utils/generateToken');
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports.registerUser = async function(req,res){
        try{
            let {email,password,fullname,user_id} = req.body;
            const existinguser = await userModel.findOne({email});
            if(existinguser){
                req.flash('error', 'You already have an account. Please login.');
                return res.redirect('/user/login'); 
            }
            const salt = await bcrypt.genSalt(10) 
            const hash = await bcrypt.hash(password, salt)
                
            const user = await userModel.create({
                    email,
                    password : hash,
                    fullname,
            });

            req.flash('success', 'Registered successfully!');
            res.redirect('/user/login');
            }
        catch (err) {
            console.error(err);
            req.flash('error', 'Something went wrong.');
            res.redirect('/user/register');
        }
}

module.exports.registerAdmin = async function(req,res){
        try{
            let {fullname,email,password,gstin,picture} = req.body;
            const existingadmin = await userModel.findOne({email});
            if(existingadmin){
                req.flash('error', 'You already have an account. Please login.');
                return res.redirect('/owner/login'); 
            }
            const salt = await bcrypt.genSalt(10) 
            const hash = await bcrypt.hash(password, salt)
                
            const Owner = await ownerModel.create({
                        picture: req.file.buffer,
                        fullname,
                        email,
                        password: hash,
                        gstin,
                    })

            req.flash('success', 'Registered successfully!');
            res.redirect('/owner/login');
            }
        catch (err) {
            console.error(err);
            req.flash('error', 'Something went wrong.');
            res.redirect('/owner/register');
        }
}

module.exports.LoginUser = async function(req,res){
     try{
        let {email,password,user_id} = req.body;

        const existinguser = await userModel.findOne({email});
        if(!existinguser){
            req.flash('error', 'User not found. Please register.');
            return res.redirect('/user/register')
        }

        if(!email){
            return res.send("Invalid email or password.");
        }

        const ismatch = await bcrypt.compare(password, existinguser.password);
        if (!ismatch) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/user/login');
        }

        let token = generateToken(existinguser);
        res.cookie("token",token);
        req.flash("success", "Login successful!");
        res.redirect("/shop");

    }

    catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong.');
        res.redirect('/user/login');
    }
}

module.exports.LoginAdmin = async function(req,res){
     try{
        let {email,password} = req.body;

        const existingadmin = await userModel.findOne({email});
        if(!existingadmin){
            req.flash('error', 'Admin not found. Please register.');
            return res.redirect('/owner/register')
        }

        if(!email){
            return res.send("Invalid email or password.");
        }

        const ismatch = await bcrypt.compare(password, existinguser.password);
        if (!ismatch) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/owner/login');
        }

        let token = generateToken(existinguser);
        res.cookie("token",token);
        req.flash("success", "Login successful!");
        res.redirect("/products/create");

    }

    catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong.');
        res.redirect('/owner/login');
    }
}

module.exports.LogOut = function(req,res){
    res.cookie("token","");
    res.redirect('/user/login');
}