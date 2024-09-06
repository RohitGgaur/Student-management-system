const express = require('express');
const router = express.Router();
const Teacher = require('../../UserSchema/teacherdetail');

router.get('/teacher-department/:department', async (req, res) => {
    const department = req.params.department;
    try {
        // Use `find` instead of `findOne` to get all teachers in the department
        const teachers = await Teacher.find({ department });
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teachers by department', error });
    }
});

module.exports = router;
