const mongoose = require('mongoose');

const student_schema = mongoose.Schema({
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
     mentors:{
        type: Array,   //mongoose.Types.ObjectId,
        required: false,
     }

})

const studentmodel = mongoose.model('student',student_schema);
module.exports = studentmodel;