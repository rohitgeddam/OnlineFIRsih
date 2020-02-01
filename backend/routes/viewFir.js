const express = require("express");
const bodyParser = require('body-parser');


const viewFirRoute = express.Router();

viewFirRoute.get("/view",(req,res)=>{
    res.status(200).json("viewing all firs");
})



module.exports =  viewFirRoute;