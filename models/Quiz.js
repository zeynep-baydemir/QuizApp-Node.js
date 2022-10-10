const mongoose = require('mongoose');
const Answer = require('./Answer');

const QuizSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answers: [{
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer'},
    }]

});

module.exports = mongoose.model('Quiz', QuizSchema);