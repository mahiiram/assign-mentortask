
const MongoClient = require('mongodb').MongoClient;  
const mongodb = require('express').Router();

var database;

mongodb.get('/details',(req,res)=>{
    res.send("Mongodb is connected to api")
})

mongodb.get('/students',(req,res)=>{
   database.collection('students').find({}).toArray((err,result)=>{
    if(err) throw errres.send(result)
   })
})

// mongodb.listen()

module.exports = mongodb