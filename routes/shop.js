const express = require('express');
const path = require('path');
//importing controllers
const productController = require('../controllers/products');

const router = express.Router();


router.get('/',productController.getProducts);

module.exports= router;