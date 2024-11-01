const mongoose = require("mongoose")

const Schema = mongoose.Schema


const UserSchema = new Schema({


 
    fullname :{
        type : String,
        required : true
    },
    gmail :{
        type : String,
        required : true
    },


}, { timestamps : true })


const User = mongoose.model('User',UserSchema) 

module.exports = User;