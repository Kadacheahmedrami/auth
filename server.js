const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require("mongoose")
const User = require("./schemas/user")
require('dotenv').config();
const cookieParser = require('cookie-parser');
const rateLimit = require("express-rate-limit");


const dbUri = process.env.DB_URI


const homeRoute = require('./routes/home');
const authRoutes = require('./routes/auth');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });
  
  app.use(limiter);


mongoose.connect(dbUri).then((result)=>app.listen(process.env.PORT)).catch((err)=>{

    if(err){
        console.log(err)
    }
})

app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));



app.use('/',homeRoute)




app.use('/auth', authRoutes); 


// app.get('/add-user',(req,res)=>{
//     const user = new User({
//         fullname :"rami",
//         gmail :'a_kadache@estin.dz',


//     })
//     user.save().then(
//         (result)=>{
//             res.send(result)
//         }
//     )
//     .catch((err)=>{

//         if(err){
//             console.log(err)
//         }
//     })
// })




app.use((req,res)=>{
    res.end("<h1>404</h1>")
})