const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: false
    },
    surname:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required:false
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
        unique: true,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);