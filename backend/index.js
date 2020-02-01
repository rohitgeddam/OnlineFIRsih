const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;



const fileFirRoute = require('./routes/fileFir');
const viewFirRoute = require('./routes/viewFir');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/fileFir/',fileFirRoute);
app.use('/api/viewFir/',viewFirRoute);

app.listen(port,()=>{
    console.log("server has started on port");
})