const express = require('express');
const app = express();
require('./config/mongoose-connection');
const path = require('path');
const index = require('./routes/index');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const ownerRoutes = require('./routes/ownerRoute');
const cartroutes = require('./routes/cart');
require("dotenv").config();
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');



app.use(cookieParser());

app.use(session({
    secret: process.env.JWT_KEY,  // change this to a strong secret
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


app.set("view engine",'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/',index);
app.use('/cart',cartroutes);
app.use('/user',userRoutes);
app.use('/products',productRoutes);
app.use('/owner',ownerRoutes);

app.listen(3000);