const mongoose = require('mongoose');
const url="mongodb+srv://gaur0423:AaNs8E8NEbiBA0hu@cluster0.mgaoi.mongodb.net/";
mongoose.connect(url)
.then(()=>{
    console.log("Mongoose connection successfully");
}).catch((error)=>{
    console.log(error);
})