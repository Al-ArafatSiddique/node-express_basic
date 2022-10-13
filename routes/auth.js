const express = require('express');

const authController = require('../controllers/auth');
const {check, body}= require('express-validator');
const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', 
[check('email').isEmail().withMessage('Pls enter a valid email address')
,body('password', 'Pls enter a pass of at least 5 characters and with num and text').isLength({min:5}).isAlphanumeric()
,body('confirmPassword').custom((value, {req})=>{
    if(value!==req.body.password){
        throw new Error('Password do not match');
    }
    return true;
})
]
, authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset-password', authController.getResetPassword);

router.post('/reset-password',authController.postResetPassword);

router.get('/reset-password/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);
module.exports = router;