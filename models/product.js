const getDb = require('../util/database').getDb;
const mongoDb= require('mongodb');

class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id= new mongoDb.ObjectId(id);
  }
  save(){
    const db= getDb();
    let dbOp;
    if(this._id){
      dbOp= db.collection('products').updateOne({_id: this._id}, {$set:this});
    }else{
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
    .then(result=>{
      console.log(result);
    }).catch(err=>{
      console.log(err);
    })
  }

  static fetchAll(){
    const db= getDb();
    return db.collection('products').find().toArray()
    .then(products=>{
      console.log(products);
      return products;
    }).catch(err=>{
      console.log(err);
    })
  }

  static findById(prodId){
    const db= getDb();
    return db.collection('products').find({_id:new mongoDb.ObjectId(prodId) }).next()
    .then(product=>{
      console.log(product);
      return product;
    }).catch(err=>{
      console.log(err);
    })
  }


}


module.exports= Product;