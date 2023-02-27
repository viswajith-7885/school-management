//import
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session =require('express-session');
const multer = require('multer');
// const fs = require("fs");
const path = require('path');
const bodyParser = require("body-parser");





//multer storage....

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+
        path.extname(file.originalname));
    }
});
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }  
};


const app =express();
const PORT =process.env.PORT || 4000;

//database connection
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URI,{useUnifiedTopology:true});

const db=mongoose.connection;
db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log("connected database"));

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:'my secret key',
    saveUninitialized:true,
    resave:false,
}));
app.use(express.static('public'));
//mulet require
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(multer({storage:fileStorage,fileFilter:fileFilter }).single('image'))

app.use((req,res,next)=>{
    res.locals.message = req.session.message
    delete req.session.message;
    next();
});

// set template engine

app.set("view engine","ejs");

//route prefix
app.use("",require('./routs/rout'));

app.listen(PORT,()=>{
    console.log("server started");
})