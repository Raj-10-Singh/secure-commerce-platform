const express = require('express');
const app = express();
const usermodel = require('./models/user-model');
const postmodel = require('./models/product-model');
const path = require('path');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const ownerRoutes = require('./routes/ownerRoute');
const port = 3000;


app.set("view engine",'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',userRoutes);
app.use('/product',productRoutes);
app.use('/owner',ownerRoutes);