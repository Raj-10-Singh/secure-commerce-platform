const express = require('express');
const router = express.Router();
const {IsLoggedin} = require("../middleware/IsLoggedin");
const ProductModel = require("../models/product-model");
const UserModel = require("../models/user-model");

router.get('/', (req, res) => {
    let error = req.flash("error")
    res.render("index",{error,showNavbar: false}); // Assuming your index.ejs handles both login and register
});



router.post('/cart/add',IsLoggedin,async(req,res)=>{
    try {
        const productId = req.body.productId;
        const product = await ProductModel.findById(productId);

        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/shop');
        }

        const user = await UserModel.findById(req.user._id);

        // Check if product is already in cart
        const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            // If already exists, increase quantity
            user.cart[itemIndex].quantity += 1;
        } else {
            // Else, add new item
            user.cart.push({ product: productId, quantity: 1 });
        }

        await user.save();
        req.flash('success', 'Product added to cart');
        res.redirect('/shop');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong');
        res.redirect('/shop');
    }
});




router.get('/shop',IsLoggedin, async(req, res) => {
    try{
        let products = await ProductModel.find()
        res.render("shop",{products});
    }
    catch(err){
        req.flash('error', 'Failed to load products');
        res.redirect('/');
    }
});




module.exports=router;