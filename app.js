const express = require('express');
const bodyParser= require('body-parser');
const path= require('path');
const expressHbs= require('express-handlebars');

const app = express();

app.engine('hbs',expressHbs());
app.set('view engine','hbs');
app.set('views','views');

const adminData= require('./routes/admin');
const shopRouters =require('./routes/shop');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminData.routes);
app.use(shopRouters);
app.use((req, res, next)=>{
    res.status(404).render('404', {pageTitle: '404:Not Found'});
})


app.listen(3000);