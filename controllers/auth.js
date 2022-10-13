const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  pool: true,
  host: "premium84.web-hosting.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "alarafatsiddique@softpiper.com", // generated ethereal user
    pass: "Arafat2413", // generated ethereal password
  },
});

exports.getLogin = (req, res, next) => {
  let msg= req.flash('error');
  if(msg.length > 0){
    msg= msg[0];
  }else{
    msg = null;
  }
  console.log(msg);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: msg
  });
};

exports.getSignup = (req, res, next) => {
  let msg= req.flash('error');
  if(msg.length > 0){
    msg= msg[0];
  }else{
    msg = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: msg
  
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email:email})
    .then(user => {
      if(!user){
        req.flash('error', 'No user found with this email');
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password)
      .then(doMatch=>{
        if(doMatch){
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
              console.log(err);
              res.redirect('/');
          });
         
        }
        req.flash('error', 'Password is incorrect');
        res.redirect('/login')
      })
      .catch(err=>{
        console.log(err);
        res.redirect('/login');
      })
      
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({email: email})
  .then(userDoc=>{
    if(userDoc){
      req.flash('error', 'Email is already signed up');
      return res.redirect('/signup');
    }
    return bcrypt
        .hash(password, 12)
      .then(hashPassword=>{
      const user = new User({
        email: email,
        password: hashPassword,
        cart: {items: []}
      })
      return user.save();
    })
    .then(result=>{
      res.redirect('/login');
    })
  })

  .catch(err=>{
    console.log(err);
  })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};


exports.getResetPassword = (req, res, next) => {
  let msg= req.flash('error');
  if(msg.length > 0){
    msg= msg[0];
  }else{
    msg = null;
  }
  console.log(msg);
  res.render('auth/reset-password', {
    path: '/reset-password',
    pageTitle: 'Reset Password',
    errorMessage: msg
  });
};

exports.postResetPassword = (req, res, next)=>{
  crypto.randomBytes(32, (err, buffer)=>{
    if(err){
      console.log(err);
      res.redirect('/');
    }
    const token = buffer.toString('hex');
    User.findOne({email: req.body.email})
    .then(user=>{
      if(!user){
        req.flash('error', 'No account found with this email');
        return res.redirect('/reset-password');
      }
      user.resetToken= token;
      user.resetTokenExpiration = Date.now()+ 360000;
      return user.save() 
    })
    .then(result=>{
      res.redirect('/login');
      transporter.sendMail({
        to: req.body.email,
        from: 'alarafatsiddique@softpiper.com',
        subject: 'Reset Password',
        html: `<h2>Your have asked for a password reset</h2>
        <h3>Click the <a href="http://localhost:3000/reset-password/${token}">link</a></h3>
          
        `
      })
    })
    .catch(err=>{
      console.log(err);
      res.redirect('/reset-password');
    })
  })
}


exports.getNewPassword= (req, res,next)=>{
  const token= req.params.token;
  User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
  .then(user=>{
    let msg= req.flash('error');
    if(msg.length > 0){
      msg= msg[0];
    }else{
      msg = null;
    }
    res.render('auth/new-password', {
      path: '/new-password',
      pageTitle: 'Reset Password',
      errorMessage: msg,
      userId: user._id.toString()
    })
  })
  .catch(err=>{
    console.log(err);
  })


} 