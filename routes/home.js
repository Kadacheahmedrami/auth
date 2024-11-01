const express = require("express");
const router  = express.Router();




router.get('/',(req,res)=>{
    res.end("<h1>HELLO</h1>")

})




module.exports = router