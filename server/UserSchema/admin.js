const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin=new mongoose.Schema({
 name:
 {
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
 logo: {
    type: String,
    default: '' 
  },
  organizationName: {
    type: String,
    default: '' 
  },
  phone:{
    type:Number,
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
});
admin.methods.generateAuthToken = async function ()
 {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, 'secretkey');
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        throw new Error(error);
    }
};
const Admin=new mongoose.model('Admin',admin);
module.exports=Admin;