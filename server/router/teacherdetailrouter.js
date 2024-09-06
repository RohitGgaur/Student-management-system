const express=require('express');
const Detail=require('../UserSchema/teacherdetail.js');
const Router= require('router')
const router = Router();
router.get('/',(req,res)=>{
    res.send(hello);
})
router.post('/teacherdetail', async (req, res) => {
    try {
        const {id, name, email, phone,fathername,city,course,gender,grad,pincode,collage,department,address,researchpaper,dob,higheredu,position,experince } = req.body;

        // Check if all fields are filled
        if (!id|| !name || !email || !phone ||!dob||!city || !course ||!gender||!grad||!pincode||!collage || !fathername ||!department || !address || !researchpaper || !higheredu || !position || !experince) {
            return res.status(400).json({ error: "Fill all sections" });
        }

        // Check if the user already exists
        const userExist = await Detail.findOne({id});
        if (userExist) {
            return res.status(300).json({ error: "User already exists" });
        }

        // Create a new user 
        const user = new Detail({id,name, email, phone,dob,city,course,gender,grad,pincode,collage, fathername,department,address,researchpaper,higheredu,position,experince});


        // Save the user to the database
        await user.save();

        // Respond with a success message and token
        res.status(201).json({ message: "Registration Successful"});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
   
});
router.get('/registration-count', async (req, res) => {
    try {
        const count = await Detail.countDocuments();
        res.json({ count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch registration count' });
    }
})
module.exports = router;