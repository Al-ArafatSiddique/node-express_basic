const User = require('../models/user');
exports.getLogin = (req, res, next) => {
    //  const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1] === 'true';
    //console.log(req.get('Cookie').split(';')[1].split('=')[1]);
    //console.log(req.session.isLoggedIn);
    res.render('auth/login', {
      pageTitle: 'Login',
      path: '/login',
      isAuthenticated: req.session.isLoggedIn,
    });
  };

  exports.postLogin = (req, res, next) => {

    User.findById('633a71140870f9ab38969e31')
    .then(user => {
      req.session.isLoggedIn= true;
      req.session.user = user;
      req.session.save(err=>{
        console.log(err);
        res.redirect('/');
      })
      
    })
    .catch(err => console.log(err));

  };

  exports.postLogout = (req, res, next) => {
    req.session.destroy(err=>{
      console.log(err);
    })
    res.redirect('/');
  };