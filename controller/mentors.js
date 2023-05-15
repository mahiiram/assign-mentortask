const mentormodel = require("./model/mentormodel");

const mentor_Router = require("express").Router();

mentor_Router.post('/creatementor', (req,res,next)=>{
    // console.log(req.body)
   const {
    mentorName,
    mentorEmail,
    mentorcontactNumber,
    primarylanguage,
    secondarylanguage,
    skills
   } = req.body;

   const newmentor = new mentormodel({
    mentorName,
    mentorEmail,
    mentorcontactNumber,
    primarylanguage,
    secondarylanguage,
    skills
   });
   newmentor.save().then((response)=>{
     if(response._id){
        return res.status(200).json({
            success:true,
            message:"mentor Created Sucessfully",
            response,
        })
     }else {
         return res.status(500).json({
            success:false,
            message:"error occured while creating a mentor",
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




module.exports = mentor_Router;