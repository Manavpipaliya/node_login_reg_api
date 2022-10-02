const express = require('express');

const mongoose = require('mongoose');
const app= express();

const port = process.env.PORT || 5454;

const dotenv = require('dotenv') //  use env file 

dotenv.config({path:'./.env'});

const expressSession = require('express-session');


const router = require('./routes/auth');

const passport = require('passport');
const { intializedPassport } = require('./passport');



intializedPassport(passport);


// connect to data base 
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("connected to mongodb");

        }
    }

);







app.get('/',(req,res)=>{
    res.send("hello manav ").statusCode(200);

});







// app.use('/api/login',router);
app.use(express.json());                // to use json data in req.body

// route middelware 
app.use('/api/user', router);       // api/user/register 

app.use('api/user', router);

app.use(expressSession({
    secret: 'secret',
   
    resave: false,
    saveUninitialized: false
})); 

app.use(passport.initialize());

app.use(passport.session());




app.listen (port , ()=>{

    console.log (`server is runnning on port ${port}`);
    
});

