const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
//importing models
const User = require('./models/user');


//importing Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { userInfo } = require('os');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.use((req, res, next)=>{
    User.findById("6337ae2ac46651ba1ded9a44")
    .then((user)=>{
        req.user = user;
        next();
    }).catch((err)=>{
        console.log(err);
        next();
    })
})

mongoConnect(()=>{
    app.listen(3000);
})
