const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const detailSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
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
    phone: {
        type: String,  // Changed from Number to String
        required: true,
        validate(value) {
            if (!validator.isMobilePhone(value, 'any')) {  // Validating the phone number
                throw new Error("Invalid phone number");
            }
        }
    },
    dob: {
        type: String,
        required: true,
        validate(value) {
            if (value < 18 || value > 30) {
                throw new Error("Invalid age");
            }
        }
    },
    gender:{
        type: String,
        required: true,
    }, 
    fathername: {
        type: String,
        required: true
    },
    mothername:{
        type: String,
        required: true
    },
    fatherphone: {
        type: String,  // Changed from Number to String
        required: true,
        validate(value) {
            if (!validator.isMobilePhone(value, 'any')) {
                throw new Error("Invalid father's phone number");
            }
        }
    },
    branch: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
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
    currcgpa:{
        type:String,
        required: true,
    },
    high:{
        type:String,
        required: true,
    },
    inter:{
        type:String,
        required: true,
    },
    gradcom:{
        type:String,
        required: true,
    },
    grad:{
        type:String,
        required: true,
    },
    rollno:{
        type: String,  // Changed from Number to String
        required: true,
        unique: true
    }
});

const StudentDetail = mongoose.model('StudentDetail', detailSchema);
module.exports = StudentDetail;
