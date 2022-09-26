exports.getAddProduct=(req, res, next)=>{
                                res.render('add-product', {products: products, 
                                pageTitle: 'Add Product',
                                path: '/admin/add-product'})}
const products= [];
exports.postAddProduct=(req, res, next)=>{
                        products.push({title: req.body.title});
                        res.redirect('/')}
exports.getProducts=(req, res, next)=>{
  
    res.render('shop', {prods:products, 
                        pageTitle: 'Products Page',
                        hasProducts: products.length>0,
                        path:'/'})
}