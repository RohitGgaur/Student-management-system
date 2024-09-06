const express=require('express');
const bcrypt = require('bcrypt');
const userschema=require('../UserSchema/teacher')
const jwt = require('jsonwebtoken');
const Router= require('router');
const router = Router();
router.get('/',(req,res)=>{
    res.send(hello);
})
router.post('/teacherRegistration', async (req, res) => {
    try {
        const {id, name, email,Department, password } = req.body;

        // Check if all fields are filled
        if (!id|| !name || !email || !Department || !password) {
            return res.status(400).json({ error: "Fill all sections" });
        }

        // Check if the user already exists
        const userExist = await userschema.findOne({ email });
        if (userExist) {
            return res.status(300).json({ error: "User already exists" });
        }

        // Create a new user with the hashed password
        const user = new userschema({id,name, email, Department, password});

        // Generate an authentication token
        const token = await user.generateAuthToken();

        // Save the user to the database
        await user.save();

        // Respond with a success message and token
        res.status(201).json({ message: "Registration Successful", token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/teachersignin', async (req, res) => {
    const {id, password } = req.body;

    // Check if email and password are provided
    if (!id || !password) {
        return res.status(405).json("Please fill in all details");
    }

    try {
        // Find the user by email
        const user = await userschema.findOne({ id: id });

        // If user doesn't exist
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // Compare the entered password with the stored password in the database
        if (password !== user.password) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // Generate authentication token
        const token = await user.generateAuthToken();

        // Respond with success message and token
        res.status(200).json({ message: "Signin Successful", token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;