const mongoose = require("mongoose")

const Schema = mongoose.Schema


const ProductSchema = new Schema({


    ProductSerialnumber:{
        type : Number,
        required : true
    },
 
    Productname :{
        type : String,
        required : true
    },
    imageUrl:{

        type : String,
        required : true
    },


}, { timestamps : true })


const Product = mongoose.model('Product',ProductSchema) 

module.exports = Product;