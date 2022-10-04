const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
 const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret', resave:false, saveUninitialized:false}));

app.use((req, res, next) => {
  User.findById('633a71140870f9ab38969e31')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000);
// });

mongoose.connect('mongodb+srv://admin:hq4v1LXQs3u4MGxI@cluster0.qcjc2ek.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
  User.findOne().then(user=>{
    if(!user){
      const user = new User({
        name: 'arafat',
        email: 'arafat@gmail.com',
        cart: {items: []}
      });
      user.save();
    
    }
  })
 
  app.listen(3000);
}).catch(err=>{
  console.log(err);
})