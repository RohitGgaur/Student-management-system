const express = require('express');
const router = express.Router();
const Teacher = require('../../UserSchema/teacherdetail');


router.put('/teacher-update/:id', async (req, res) => {
    const id = req.params.id;
    const {phone,email,position,experince,researchpaper,address,pincode}=req.body;
    const updates = req.body; 

    try {
        const teacher = await Teacher.findOneAndUpdate(
            { id: id }, // Find the student by roll number
            { $set: updates }, // Update the fields provided in the request body
            { new: true } // Return the updated document
        );

        if (!teacher) {
            return res.status(404).json({ message: 'teacher not found' });
        }

        res.json(teacher); // Return the updated student details
    } catch (error) {
        console.error('Error updating teacher details:', error);
        res.status(500).json({ message: 'Error updating teacher details' });
    }
});

module.exports = router;
