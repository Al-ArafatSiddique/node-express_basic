const express = require('express');

const authController = require('../controllers/auth');
const {check}= require('express-validator/check');
const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', check('email').isEmail().withMessage('Pls enter a valid email address'), authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset-password', authController.getResetPassword);

router.post('/reset-password',authController.postResetPassword);

router.get('/reset-password/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);
module.exports = router;