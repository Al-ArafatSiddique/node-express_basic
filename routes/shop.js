const express = require('express');
const path = require('path');

const router = express.Router();
const adminData = require('./admin');

router.get('/',(req, res, next)=>{
    console.log('from shop', adminData.products)
    res.render('shop', {prods: adminData.products, pageTitle: 'Products Page', hasProducts: adminData.products.length>0})
})

module.exports= router;