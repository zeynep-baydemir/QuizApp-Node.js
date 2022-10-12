const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const app = express();

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'static')))

app.listen(8090);

const userRoute = require('./routes/users');
const quizRoute = require('./routes/quizzes');
const User = require('./models/User');

app.use('/users', userRoute);
app.use('/quizzes', quizRoute);

JWT_SECRET = 'lsanlafblfef#aghjk41.6&sa*flalas/23*66f?aglh';
app.post('/register', async (req,res)=> {
    const {username, password: plainTextPassword} =req.body;
    if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

    if (plainTextPassword.length < 6){
        return res.json({
            status:'error',
            error: 'Password should be at least 6 characters.'
        })
    }
    const password = await bcrypt.hash(plainTextPassword,10);
    
    try{
        const response = await User.create({
            username,
            password
        })
        console.log("user is created")
    }catch(err){
        if (err.code === 11000) {
			return res.json({ status: 'error', err: 'Username already in use' });
		}
		throw err;
    };    
    res.json({status:'ok'})
})

app.post('/login', async (req,res) => {
    const {username, password} =req.body;
    const user = await User.findOne({username}).lean;

    if(!user) {
        return res.json({status:'error', error: 'Invalid username'})
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({
            id: user._id, 
            username: user.username
        }, 
        JWT_SECRET
        )
        return res.json({status:'ok', data: ''})
    }
    res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/change-password', async (req,res) => {
    const { token, newPassword} = req.body;
    try{
        const user = jwt.verify(token,JWT_SECRET);
        const _id = user.id;
        const password = await bcrypt.hash(newPassword,10);
        await User.updateOne(
            {_id},
            {$set: {password}}
        )
        res.json({status:'ok'});
    }catch(error){
        res.json({status:'error', error:''})
    }
})
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},()=>{
    console.log('connected to mongodb')
})