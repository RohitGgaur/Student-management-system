const express = require('express');
const router = express.Router();
const Student = require('../../UserSchema/studentdetail');


router.put('/student-update/:rollno', async (req, res) => {
    const rollno = req.params.rollno;
    const {phone,email,fatherphone,address,pincode}=req.body;
    const updates = req.body; 

    try {
        const student = await Student.findOneAndUpdate(
            { rollno: rollno }, // Find the student by roll number
            { $set: updates }, // Update the fields provided in the request body
            { new: true } // Return the updated document
        );

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(student); // Return the updated student details
    } catch (error) {
        console.error('Error updating student details:', error);
        res.status(500).json({ message: 'Error updating student details' });
    }
});

module.exports = router;
