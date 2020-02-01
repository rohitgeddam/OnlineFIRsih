const express = require("express");





const router = express.Router();
const multer = require('multer');


// router.get("/file",(req,res,next)=>{
//     res.status(200).json("hello");
// })


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage});

router.post("/file",upload.single('signImage'),(req,res,next)=>{
    console.log(req.file);
    let data = {};
     data.complainersName = req.body.complainersName;
     data.mobileNumber =  req.body.mobileNumber;
     data.emailId = req.body.emailId;
     data.currentAddress = req.body.currentAddress;
     data.occupation = req.body.occupation;
     data.firStatement = req.body.firStatement;
     data.placeOfOffence = req.body.placeOfOffence;
     data.moreDetails = req.body.moreDetails;
    console.log(data);
    



    res.status(200).json({
        message : "good work",
    });
})


module.exports =  router;