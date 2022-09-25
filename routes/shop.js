const express = require('express');
const path = require('path');

const router = express.Router();
const adminData = require('./admin');

router.get('/',(req, res, next)=>{
    console.log('from shop', adminData.products)
    res.sendFile(path.join(__dirname, '..','views','shop.html'))
})

module.exports= router;