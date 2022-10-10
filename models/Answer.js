const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
    answer: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Answer',AnswerSchema);