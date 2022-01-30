var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://mydb:mydb1234@cluster0.m8suo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const crypto = require('crypto');


MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db('myFirstDatabase');
    dbo.collection("filemetadatas").find().toArray(function(err, result){
        if(err) throw err;
        const data = JSON.stringify(result);
        const hash = crypto.createHash('sha256').update(data).digest('hex')
        console.log(hash)
        
        db.close()
    })
})