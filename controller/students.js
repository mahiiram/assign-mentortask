const student_Router = require("express").Router();
// const { response } = require("../app");
const studentmodel = require("./model/studentmodel"); 

student_Router.get("/getstudents", async (req,res,next)=>{
    let item;
    try {
      item = await studentmodel.find();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    if(!item){
        return res.status(500).json({
            message:"There is no student by given id"
        })
    }
    return res.status(200).json({ item })  
})

student_Router.post('/createstudent', (req,res,next)=>{
    // console.log(req.body)
   const {
    studentName,
    studentEmail,
    contactNumber,
    courseName,
    primarylanguage,
    mentorId
   } = req.body;

   const newstudent = new studentmodel({
    studentName,
    studentEmail,
    contactNumber,
    courseName,
    primarylanguage,
    mentorId
   });
   newstudent.save().then((response)=>{
     if(response._id){
        return res.status(200).json({
            success:true,
            message:"Student Created Sucessfully",
            response,
        })
     }else {
         return res.status(500).json({
            success:false,
            message:"error occured while creating a student",
            response,
     
        });
    }
}).catch((error)=>{
    res.status(400).json({
       success: false,
       message:"BAD REQUEST",
       error: error,
    })
})
});


//find the student by name
student_Router.get("/students/:id", async (req,res,next)=>{
        let item;
        try {
          item = await studentmodel.findById(req.params.id);
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
        if(!item){
            return res.status(500).json({
                message:"There is no student by given id"
            })
        }
        return res.status(200).json({ item })  
})

//Finding the mentorId for a particular student
student_Router.get("/students/bymentor/:id",async  (req,res,next)=>{
    
    let item;
        try {
          item = await studentmodel.findById(req.params.mentorId);
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
        if(!item){
            return res.status(500).json({
                message:"There is no student by given id"
            })
        }
        return res.status(200).json({ item })  
})


// update the mentor using studentid 


student_Router.patch('/updatestudent', (req,res,next)=>{
    // console.log(req.body)
   const {
    studentid,
    studentName,
    studentEmail,
    contactNumber,
    courseName,
    primarylanguage,
    mentorId
   } = req.body;

   studentmodel.updateOne({
    _id:studentid}, 
    {
    $set:{
      studentName,
      studentEmail,
      contactNumber,
      courseName,
      primarylanguage,
      mentorId
    }
   }).then((response)=>{
     if(response && response.acknowledged && response.modifiedCount===1){
        return res.status(200).json({
            success:true,
            message:"Student updated Sucessfully",
            response,
        })
     }else {
         return res.status(500).json({
            success:false,
            message:"error occured while updating a student",
            response,
        });
    }
}).catch((error)=>{
    res.status(400).json({
       success: false,
       message:"BAD REQUEST",
       error: error,
    })
})
})

module.exports = student_Router;