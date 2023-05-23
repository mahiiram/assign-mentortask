const express = require("express");
const bodyparser = require("body-parser");
const node_server = express();
const env = require("dotenv").config()
const cors = require("cors");
const mongoose = require('mongoose');
const student_Router = require("./controller/students");
const mentor_Router = require("./controller/mentors");




node_server.use(cors());
node_server.use(bodyparser.json());
node_server.use(bodyparser.urlencoded({ extended:true }));


node_server.use('/',student_Router);
node_server.use('/',mentor_Router);



const port= 5000;
node_server.listen(port,() => {
    console.log('server started', port);
});
mongoose.connect(process.env.DB).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})




