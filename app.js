const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');
const app = express();

app.use(bodyParser.json());

app.listen(8090);

const userRoute = require('./routes/users');
const quizRoute = require('./routes/quizzes');

app.use('/users', userRoute);
app.use('/quizzes', quizRoute);

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},()=>{
    console.log('connected to mongodb')
})