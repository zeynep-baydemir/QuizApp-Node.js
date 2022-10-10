const express = require('express');
const router = express.Router();

const Quiz = require('../models/Quiz');

router.get('/', async (req,res) => {
    try{
        const quizzes = await Quiz.find();
        res.json(quizzes);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:quizId', async (req,res) => {
    try{
        const quiz = await Quiz.findById(req.params.quizId);
        res.json(quiz);
    }catch(err){
        res.json({message:err});
    }
});

router.post('/', async (req,res) => {
    const quiz = new Quiz ({
        name: req.body.name,
        question: req.body.question,
        answers: req.body.answers
    });
    try {
        const newQuiz = await quiz.save();
        res.json(newQuiz);
    }catch{
        res.json({message:err});
    }
});

router.patch('/addAnswer/:quizId', async (req,res) => {
    try{
        const updated = await Quiz.updateOne(
            {_id: req.params.userId},
            {$push: {answers: [req.body.answers]}});
            res.json(updated);
        }catch(err){
            res.json({message:err});
        };
})

router.patch('/:quizId', async (req,res) => {
    try{
        const updatedQuiz = await Quiz.updateOne(
            {_id: req.params.userId},
            {$set: {name: req.body.name,
                    question: req.body.question,
                    answers: req.body.answers}
            });
        res.json(updatedQuiz);
    }catch(err){
        res.json({message:err});
    };
});

router.delete('/:quizId', async(req,res) => {
    try{
        const deletedQuiz = await Quiz.remove({_id:req.params.quizId});
        res.json(deletedQuiz);
    }catch{
        res.json({message:err});
    }
});

router.delete('/deleteAnswer/:quizId/:answerId',async(req,res) =>{
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        await quiz.answers.pull({_id:req.params.answerId});
        const updatedQuiz = quiz.save();
        res.json(updatedQuiz);
    }catch(err){
        res.json({message:err});
    }
} )
 
module.exports = router;
