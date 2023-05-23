const mongoose = require('mongoose');

const  mentor_schema=new mongoose.Schema({
   mentorName:{
      type: String,
      required: true
  },
  mentorEmail:{
      type: String,
      required: true,
   },
  mentorcontactNumber:{
      type: String,
      required: true
   },

   primarylanguage:{
      type:String,
      required: true
   },
   secondarylanguage:{
      type:String,
      required: true
   },
   skills:{
      type: Array, 
      required: true,
      default: null
   }

})

module.exports = mongoose.model('mentor',mentor_schema);