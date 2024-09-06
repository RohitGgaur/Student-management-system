const express = require('express');
const router = express.Router();
const Teacher = require('../../UserSchema/teacherdetail');

router.delete('/teacher-delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const teacher = await Teacher.findOneAndDelete({ id: id });
        if (!teacher) {
            return res.status(404).send('teacher not found');
        }
        res.status(200).send('teacher deleted successfully');
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;