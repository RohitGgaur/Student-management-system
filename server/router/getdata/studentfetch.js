const express=require('express');
const router = express.Router();
const Student=require('../../UserSchema/studentdetail');
router.get('/student/:rollno',async(req,res)=>{
    const rollno=await req.params.rollno;
    try {
        const user=await Student.findOne({rollno});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
});
module.exports = router;