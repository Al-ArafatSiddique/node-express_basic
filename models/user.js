const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id= id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product){
    const cartProductIndex = this.cart.items.findIndex((cp)=>{
      return cp.productId.toString() === product._id.toString();
      // return cp.productId == product._id; this also works
    })
    let newQuantity= 1;
    const updatedCartItems = [...this.cart.items];
    if(cartProductIndex >= 0){
      console.log(this.cart.items[cartProductIndex].quantity);
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    }else{
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
         quantity: newQuantity});
    }
  
    const updatedCart = {items: updatedCartItems};
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        {_id: new mongodb.ObjectId(this._id)},
        {$set: {cart:updatedCart}}
        )
  }

  getCart(){
    const db= getDb();

    const productIds=  this.cart.items.map((i)=>{
      return i.productId;
    })

    return db.collection('products')
    .find({_id: {$in: productIds}})
    .toArray()
    .then((products)=>{
      return products.map(p=>{
        return {
          ...p, 
          quantity: this.cart.items.find(i=>{
             return i.productId.toString() === p._id.toString();
          }).quantity
        }
      })
    }
    )
    .catch(err=>{
      console.log(err);
    })
  }

  deleteItemsFromCart(productId){
    const updatedCart = this.cart.items.filter(p=>{
      return p.productId.toString() !== productId.toString();
    })
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        {_id: new mongodb.ObjectId(this._id)},
        {$set: {cart:{items: updatedCart}}}
        )
  }
   

  addOrder(){
    const db = getDb();
    return db.collection('orders')
    .insertOne(this.cart);
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;