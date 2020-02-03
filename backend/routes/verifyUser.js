const express = require("express");
const bodyParser = require('body-parser');
const config = require("../config")
const Nexmo = require('nexmo');
const router = express.Router();

// const client = require("twilio")(config.accountSID,config.authToken)

const nexmo = new Nexmo({
    apiKey: '4987cdcb',
    apiSecret: 'XOeFZsPBLTt7ScTO',
  });


var reqID = ''
router.post("/getotp",(req,res)=>{
  
    // client
    // .verify
    // .services(config.serviceID)
    // .verifications
    // .create({
    //     to: `+91${req.query.mobileNumber}`,
    //     channel: req.query.channel
    // })
    // .then((data)=>{
    //     console.log(data)
    //     res.status(200).send(data)
    // })
    // res.status(200).json("viewing all firs");'916266218189'
    nexmo.verify.request({
        number: '916266218189' ,
        brand: 'Nexmo',
        code_length: '4'
      }, (err, result) => {
          if(!err){
            reqID = result.request_id
          }
          
        console.log(err ? err : result)
        res.status(200).json({
            reqId : result.request_id
        })
      });

     
})



router.post("/verifyOtp",(req,res)=>{
  
    let code_r = req.body.code
   let id =  req.body.reqID
    // client
    // .verify
    // .services(config.serviceID)
    // .verifications
    // .create({
    //     to: `+91${req.query.mobileNumber}`,
    //     channel: req.query.channel
    // })
    // .then((data)=>{
    //     console.log(data)
    //     res.status(200).send(data)
    // })
    // res.status(200).json("viewing all firs");'916266218189'
    nexmo.verify.check({
        request_id: id,
        code: code_r
      }, (err, result) => {
          if(result.status == '0'){
              res.status(200).json({
                  status:"0"
              })
          }
        console.log(err ? err : result)
      });

     
})


module.exports =  router;