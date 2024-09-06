const express=require('express');
const Detail=require('../UserSchema/studentdetail');
const Router= require('router')
const router = Router();
router.get('/',(req,res)=>{
    res.send(hello);
})
router.post('/studentdetail', async (req, res) => {
    try {
        const {id, name, email, phone,dob,fathername,mothername,gender,fatherphone,branch,address,course,rollno, city,pincode,collage,currcgpa,high,inter,gradcom,grad} = req.body;

        // Check if all fields are filled
        if (!id|| !name || !email || !phone ||!dob || !fathername || !mothername  ||!fatherphone || !branch || !address || !course || !rollno ||!city ||!pincode||!collage||!currcgpa||!high||!inter||!gradcom||!grad||!gender) {
            return res.status(400).json({ error: "Fill all sections" });
        }

        // Check if the user already exists
        const userExist = await Detail.findOne({ id});
        if (userExist) {
            return res.status(300).json({ error: "User already exists" });
        }

        // Create a new user 
        const user = new Detail({id,name, email, phone,dob, fathername,mothername,gender,fatherphone,branch,address,course,rollno,city,pincode,collage,currcgpa,high,inter,gradcom,grad});


        // Save the user to the database
        await user.save();

        // Respond with a success message and token
        res.status(201).json({ message: "Registration Successful"});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/registration-sum', async (req, res) => {
    try {
        const sum = await Detail.countDocuments();
        res.json({ sum });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch registration count' });
    }
});
module.exports = router;