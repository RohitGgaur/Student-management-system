const express = require('express');
const router = express.Router();
const Student = require('../../UserSchema/studentdetail'); 

router.get('/student-branch/:branch', async (req, res) => {
    const branch = req.params.branch;

    try {
        const students = await Student.find({ branch }); 
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students by branch', error });
    }
});

module.exports = router;