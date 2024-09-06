const mongoose=require('mongoose');
const validator=require('validator');
const jwt = require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
 name:{
    type:String,
    required:true
 },
 email:{
    type:String,
    unique:true,
    required:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid Email");
        }
    }
 },
  Department:{
    type:String,
    required:true
 },
 password:{
    type:String,
    unique:true,
    required:true
 },
 tokens:[
    {
        token:{
            type:String,
            required:true 
        }
    }
]
})
 userSchema.methods.generateAuthToken=async function(){
 const token=jwt.sign({_id:this._id.toString()},'secretkey');
 this.tokens=this.tokens.concat({token});
 await this.save();
 return token;
};
const Teacher=new mongoose.model('Teacher',userSchema);
module.exports=Teacher;