
global.window = {document: {createElementNS: () => {return {}} }};
global.navigator = {};
global.html2pdf = {};
global.btoa = () => {};

global.Base64 = {
    encode: function(str) {
      return Buffer.from(str).toString('base64');
    },
  };
  global.gzip = {
    zip: function(str) {
      return zlib.gzipSync(Buffer.from(str));
    },
  }
const express = require("express");
const image2base64 = require('image-to-base64');

var fs = require('fs');
const jsPdf = require('jspdf')

var atob = require('atob');


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
router.post('/upload',upload.single('photo'),(req,res,next)=>{
    console.log("image is uploaded");
    
    
    res.json(req.file)
})


router.post("/file",(req,res,next)=>{
    var base64data = ''
    console.log(req.file);
    // var imgData = 'data:image/jpg;base64,'+ Base64.encode('./uploads/photo.jpg');
    // var imageData = "./uploads/photo.jpg"
    // image2base64("./uploads/photo.jpg") // you can also to use url
    // .then(
    //     (response) => {
    //         console.log(response); //cGF0aC90by9maWxlLmpwZw==
    //         base64data = response
    //     }
    // )
    // .catch(
    //     (error) => {
    //         console.log(error); //Exepection error....
    //     }
    // )
    // var imgData = 'data:image/jpeg;base64,',base64data;
    let data = {};
     data.complainersName = req.body.complainersName;
     data.mobileNumber =  req.body.mobileNumber;
     data.emailId = req.body.emailId;
     data.currentAddress = req.body.currentAddress;
     data.occupation = req.body.occupation;
     data.firStatement = req.body.firStatement;
     data.placeOfOffence = req.body.placeOfOffence;
     data.moreDetails = req.body.moreDetails;
     data.firNumber = "FIR"+data.mobileNumber
    console.log(data);
    


    var doc = new jsPdf()
    doc.setFontSize(25);
    doc.text("SAMPLE FIR",10,10)
    doc.setFontSize(16)
    doc.text("FIR Number: " + data.firNumber,10,30)
    doc.text("Complainers Name: " + data.complainersName,10,40);
    doc.text("Mobile Number   : " + data.mobileNumber,10,50);
    doc.text("Email ID        : " + data.emailId,10,60);
    doc.text("Current Address : " + data.currentAddress,10,70);
    doc.text("Occupation       : " + data.occupation,10,80);
    doc.text("Place of offence : " + data.placeOfOffence,10,90);

    // doc.save('a4.pdf');
   
    doc.setFontSize(20);
    doc.text("FIR STATEMENT     : " + data.firStatement,10,110);
    doc.text("More Details      : " + data.moreDetails,10,130);

    // doc.addImage(imgData, 'JPEG', 10, 150, 180, 160);
    var pdfData = doc.output();






    fs.writeFileSync('./pdf/'+data.mobileNumber+'.pdf', pdfData, 'binary');
    res.status(200).json({
        message : "good work",
    });
})
delete global.window;
delete global.html2pdf;
delete global.navigator;
delete global.btoa;

module.exports =  router;