const mongoose = require('mongoose');
const env = require("dotenv").config();


mongoose.connect(process.env.DB).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log("error")
})

