const express = require('express');
const router = express.Router();
const {IsLoggedin} = require("../middleware/IsLoggedin");
const User = require('../models/user-model');
const Product = require('../models/product-model');

router.get('/', IsLoggedin, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product');
        const cartItems = (user.cart || []).map(item => {
            const product = item.product;
            return {
                id: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                image: product.image ? `data:image/jpeg;base64,${product.image.toString('base64')}` : ''
            };
        });

        const totalMRP = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const discount = Math.floor(totalMRP * 0.1); // 10% discount

        res.render('cart', {
            cartItems,
            discount,
            success: req.flash('success'),
            error: req.flash('error')
        });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to load cart');
        res.redirect('/shop');
    }
});


router.post('/increase/:id', IsLoggedin, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const item = user.cart.find(c => c.product.toString() === req.params.id);
        if (item) item.quantity += 1;
        await user.save();
        res.redirect('/cart');
    } catch (err) {
        req.flash('error', 'Could not update cart');
        res.redirect('/cart');
    }
});

router.post('/decrease/:id', IsLoggedin, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const index = user.cart.findIndex(c => c.product.toString() === req.params.id);
        if (index > -1) {
            if (user.cart[index].quantity > 1) {
                user.cart[index].quantity -= 1;
            } else {
                user.cart.splice(index, 1); // remove item from cart
            }
            await user.save();
        }
        res.redirect('/cart');
    } catch (err) {
        req.flash('error', 'Could not update cart');
        res.redirect('/cart');
    }
});



module.exports = router;