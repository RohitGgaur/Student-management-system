const mongoose=require('mongoose');
const validator=require('validator');
const jwt = require('jsonwebtoken');
const detail = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    gender:{
        type: String,
        required: true,
    }, 
    phone: {
        type: Number,
        required: true,
    },
    fathername: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true
    },
    pincode:{
        type: Number,
        required: true,
    },
    course: {
        type: String,
        required: true
    },
    collage:{
        type: String,
        required: true
    },
    researchpaper: {
        type: Number,
        required: true,
    },
    dob: {
        type: String,
        required: true,
        validate(value) {
            if (value < 21 || value > 60) {
                throw new Error("Invalid age");
            }
        }
    },
    higheredu: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true
    },
    experince: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 2) {
                throw new Error("Invalid experience");
            }
        }
    },
    grad:{
        type:String,
        required: true,
    },

});

const Teacherdetail = mongoose.model('Teacherdetail', detail);
module.exports = Teacherdetail;
