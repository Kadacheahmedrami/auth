const express = require("express");
const router  = express.Router();




router.get('/auth',(req,res)=>{
    res.end("<h1>auth</h1>")

})




module.exports = router