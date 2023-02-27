const mongoose = require('mongoose');
const userSchema =new mongoose.Schema({
    firstname:{
        type: String,
        require: true,
    },
    lastname:{
        type:String,
        require:true
    },
    
    birthday:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
   
    image:{
        type:String,
        require:true
    },
  
})
module.exports =mongoose.model("User",userSchema);