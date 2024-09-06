const express=require('express');
const userschema = require('../UserSchema/admin')
const jwt = require('jsonwebtoken');
const Router= require('router');
const router = Router();
router.get('/',(req,res)=>{
    res.send(hello);
})


router.post('/Registration', async (req, res) => {
    try {
        const { name, email,logo,organization, phone, password } = req.body;

        
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ error: "Fill all sections" });
        }

        const userExist = await userschema.findOne({ email });
        if (userExist) {
            return res.status(300).json({ error: "User already exists" });
        }
        const user = new userschema({ name, email,logo,organization, phone, password});

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


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    console.log("yes i am hitted");
    // Check if email and password are provided
    if (!email || !password) {
        return res.status(405).json("Please fill in all details");
    }

    try {
        // Find the user by email
        const user = await userschema.findOne({ email: email }); // Assuming `Admin` is the model

        // If user doesn't exist
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // Compare the entered password with the stored password in the database
        if (password !== user.password) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // Generate authentication token (if you're using JWT)
        const token = await user.generateAuthToken();

        // Respond with success message and token
        res.status(200).json({ message: "Signin Successful", token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;