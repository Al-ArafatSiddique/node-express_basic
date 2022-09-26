const express = require('express');
const bodyParser= require('body-parser');
const path= require('path');

//importing controllers 
const errorController= require('./controllers/error');

const app = express();


app.set('view engine','ejs');
app.set('views','views');

const adminRoutes= require('./routes/admin');
const shopRouters =require('./routes/shop');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes);
app.use(shopRouters);
app.use(errorController.get404Page);


app.listen(3000);