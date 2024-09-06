const express=require('express');
const router = express.Router();
const Teacher=require('../../UserSchema/teacherdetail');
router.get('/teacher/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        const user=await Teacher.findOne({id});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teachers', error });
    }
});
module.exports = router;