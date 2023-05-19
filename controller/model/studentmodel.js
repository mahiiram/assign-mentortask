const mongoose = require('mongoose');

const student_schema =new mongoose.Schema({
    studentName:{
        type: String,
        required: true
    },
    studentEmail:{
        type: String,
        required: true,
     },
    contactNumber:{
        type: String,
        required: true
     },
     courseName:{
        type:String,
        required:true
     },
     primarylanguage:{
        type:String,
        required: true
     },
     mentorId:{
        type: mongoose.Types.ObjectId,
        ref:'mentor',
        required: true,
     }

})

const studentmodel = mongoose.model('student',student_schema);
module.exports = studentmodel;