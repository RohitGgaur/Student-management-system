const express = require('express');
const router = express.Router();
const Student = require('../../UserSchema/studentdetail');

router.delete('/delete/:rollno', async (req, res) => {
    try {
        const rollno = req.params.rollno;
        const student = await Student.findOneAndDelete({ rollno: rollno });
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.status(200).send('Student deleted successfully');
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;


