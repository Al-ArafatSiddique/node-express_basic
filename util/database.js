const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback)=>{
    MongoClient.connect('mongodb+srv://admin:hq4v1LXQs3u4MGxI@cluster0.qcjc2ek.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client=>{
        console.log('connected')
        _db= client.db();
        callback();    
    })
    .catch(err=>{
        console.log(err)
        throw err; 
    })
}

const getDb= ()=>{
    if(_db){
        return _db;
    }
    throw "No database found";
}

exports.mongoConnect= mongoConnect;
exports.getDb= getDb;
