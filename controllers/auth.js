const User = require('../models/user');
const bcrypt = require('bcryptjs');

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