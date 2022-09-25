const express = require('express');
const path= require('path');

const router = express.Router();
const products= [];

router.get('/add-product', (req, res, next)=>{
    res.render('add-product', {products: products, pageTitle: 'Add Product'})

})
router.post('/add-product',(req, res, next)=>{
    products.push({title: req.body.title})
    res.redirect('/');
})

// module.exports= router;
exports.routes= router;
exports.products= products;
