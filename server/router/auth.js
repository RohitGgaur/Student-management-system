const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../UserSchema/studentdetail')
const Teacher = require('../UserSchema/teacherdetail')
const jwt = require('jsonwebtoken');
const Router = require('router');
const router = Router();
router.get('/', (req, res) => {
  res.send(hello);
})
// router.post('/UserRegistration', async (req, res) => {
//     try {
//         const {studentid, name, email, branch, password } = req.body;

//         // Check if all fields are filled
//         if (!studentid|| !name || !email || !branch || !password) {
//             return res.status(400).json({ error: "Fill all sections" });
//         }

//         // Check if the user already exists
//         const userExist = await userschema.findOne({ email });
//         if (userExist) {
//             return res.status(300).json({ error: "User already exists" });
//         }

//         // Create a new user with the hashed password
//         const user = new userschema({studentid,name, email, branch, password});

//         // Generate an authentication token
//         const token = await user.generateAuthToken();

//         // Save the user to the database
//         await user.save();

//         // Respond with a success message and token
//         res.status(201).json({ message: "Registration Successful", token });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
router.post('/signin', async (req, res) => {
  const { email, dob, userType } = req.body;

  try {
    let user;

    if (userType === 'student') {
      const formattedDob = dob.split('/').reverse().join('-');
      user = await Student.findOne({ email, dob: formattedDob });
    } else if (userType === 'teacher') {
      const formattedDob = dob.split('/').reverse().join('-');
      user = await Teacher.findOne({ email, dob: formattedDob });
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }
    // console.log('Request body:', req.body);
    // console.log('Querying with:', { email, dob, userType });
    // console.log('Student query result:', await Student.findOne({ email, dob }));
    // console.log('Teacher query result:', await Teacher.findOne({ email, dob }));


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user data or success message
    res.status(200).json({ message: 'Signin successful', user });

  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;