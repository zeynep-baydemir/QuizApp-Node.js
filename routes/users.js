const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {authenticateUser,authenticateAdmin} = require('../middlewares/authentication');


router.get('/',authenticateAdmin,async (req,res) => {
    try{
        const size = req.query.size;
        const page = req.query.page;
        const users=await User.find({},{},{skip:page*size,limit:size}).select('username _id role');
        res.json(users);
    }catch(err){
        res.json({message:err});
    }
});


router.get('/:userId',authenticateUser, async (req,res) => {
    try {
        const user=await User.findById(req.params.userId).select('username _id');
        res.json(user);
    }catch(err){
        res.json({message:err});
    }
});

router.post('/',authenticateUser,async (req,res)=> {
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    });
    try {
        const newUser = await user.save();
        res.json(newUser);
    }catch(err){
        res.json({message:err});
    }
});

router.delete('/:userId',authenticateAdmin, async (req,res) =>{
    try{
        const deletedUser = await User.remove({_id: req.params.userId});
        res.json(deletedUser);
    }catch(err){
        res.json({message:err});
    }
});

router.patch('/:userId', authenticateUser, async (req,res)=>{
    try{
        const updatedUser = await User.updateOne(
            {_id: req.params.userId},
            {$set: {name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password}
            },
            { runValidators: true });
        res.json(updatedUser);
    }catch(err){
        res.json({message:err});
    };
});

/*
router.patch('/role/:userId',async (req,res)=>{
    try{
        const updatedUser = await User.updateOne(
            {_id: req.params.userId},
            {$set: {role:"admin"}
            },
            { runValidators: true });
        res.json(updatedUser);
    }catch(err){
        res.json({message:err});
    };
});
*/
module.exports = router;
