const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require("mongoose")
const User = require("./schemas/user")
require('dotenv').config();


const dbUri = process.env.DB_URI


const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');



mongoose.connect(dbUri).then((result)=>app.listen(process.env.PORT)).catch((err)=>{

    if(err){
        console.log(err)
    }
})



app.use(morgan('dev'));



app.use('/',homeRoute)

app.use('/auth',authRoute)

app.get('/add-user',(req,res)=>{
    const user = new User({
        fullname :"rami",
        gmail :'a_kadache@estin.dz',


    })
    user.save().then(
        (result)=>{
            res.send(result)
        }
    )
    .catch((err)=>{

        if(err){
            console.log(err)
        }
    })
})




app.use((req,res)=>{
    res.end("<h1>404</h1>")
})