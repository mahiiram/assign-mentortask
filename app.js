const express = require("express");
const student_Router = require("./controller/students");
const mentor_Router = require("./controller/mentors");
const App_server = express();
// const App_Router = express.Router();


// App_Router.get("/",(req,res,next) => {
//       return res.status(200).json({
//         message:"Server Started"
//     })
// });


App_server.use('/',student_Router);
App_server.use('/',mentor_Router);

module.exports = App_server;