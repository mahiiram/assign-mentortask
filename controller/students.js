const student_Router = require("express").Router();
// const { response } = require("../app");
const studentmodel = require("./model/studentmodel");

student_Router.post('/createstudent', (req,res,next)=>{
    // console.log(req.body)
   const {
    studentName,
    studentEmail,
    contactNumber,
    courseName,
    primarylanguage,
    mentors
   } = req.body;

   const newstudent = new studentmodel({
    studentName,
    studentEmail,
    contactNumber,
    courseName,
    primarylanguage,
    mentors
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


//find the student by a mentor 
student_Router.get("/students/findbymentor",  (req,res,next)=>{
    studentmodel.aggregate([
      {
        $match:{mentors:{$elemMatch:{$and:[{Name:"Ruban"}]}}}
      },
      {
        $project:{
            studentName:1
        } 
      }
    ]).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err)
    })
})

//Finding the mentors for a particular student
student_Router.get("/students/find",  (req,res,next)=>{
    studentmodel.aggregate([
        {
            $match:{studentName:"Mahendran"}
        },
        {
          $project:{
            mentors:1
          }
        }
    ]).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err)
    })
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
    mentors
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
      mentors
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