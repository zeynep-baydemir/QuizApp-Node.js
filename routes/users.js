const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:userId', async (req,res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch(err){
        res.json({message:err});
    }
});

router.post('/', async (req,res)=> {
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    });
    try {
        const newUser = await user.save();
        res.json(newUser);
    }catch{
        res.json({message:err});
    }
});

router.delete('/:userId', async (req,res) =>{
    try{
        const deletedUser = await User.remove({_id: req.params.userId});
        res.json(deletedUser);
    }catch(err){
        res.json({message:err});
    }
});

router.patch('/:userId', async (req,res)=>{
    try{
        const updatedUser = await User.updateOne(
            {_id: req.params.userId},
            {$set: {name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password}});
        res.json(updatedUser);
    }catch(err){
        res.json({message:err});
    };
});

module.exports = router;
