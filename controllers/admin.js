const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product( title, imageUrl, description, price);
  product.save().then(result=>{
    console.log('product created')
    res.redirect('/');
  }).catch(err=>{
    console.log(err)
  })

};



exports.getProducts= (req, res, next)=>{
  Product.fetchAll()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  }).catch((err)=>{
    console.log(err)
  })
}