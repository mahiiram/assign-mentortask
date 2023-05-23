const student_Router = require("express").Router();
// const { response } = require("../app");
const studentmodel = require("./model/studentmodel"); 

student_Router.get("/", async (req,res,next)=>{
    let students;
    try {  
      students = await studentmodel.find();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    if(!students){
        return res.status(500).json({
            message:"There is no student"
        })
    }
    return res.status(200).json({ students })  
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


//find the student by id
student_Router.get("/students/:id", async (req,res,next)=>{
        let students;
        try {
          students = await studentmodel.findById(req.params.id);
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
        if(!students){
            return res.status(500).json({
                message:"There is no student by given id"
            })
        }
        return res.status(200).json({ students })  
})

//using the mentorId for a particular student
student_Router.get("/students/bymentor",async  (req,res,next)=>{
    
    let students;
        try {
          students = await studentmodel.aggregate([
            {
                $match:{mentorId:{$elematch:{$and:[{"_id":"6467f1971d203efc835d8456"}]}}}
            },
            {
                $project:{studentname:1}
            }
          ]);
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
        if(!students){
            return res.status(500).json({
                message:"There is no student by given id"
            })
        }
        return res.status(200).json({ students })  
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

// find the mentor by student name
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

module.exports = student_Router;