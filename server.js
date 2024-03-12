const express = require('express')
const app = express()
const mongoose = require('mongoose') //importing {'express','mongoose'}
const routes = require('./routes/routes')
const cookieParser = require('cookie-parser')
const StudentController = require('./src/students/studentController')

mongoose.set('strictQuery',false)

mongoose.connect('mongodb://localhost:27017/VLP')
const db = mongoose.connection;

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log("DB Connected Successfully")
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);
app.use(cookieParser())

/*app.get('/set-cookies',(req,res)=>{

  //  res.setHeader('set-cookie','newUser=true')
    res.cookie('newUser',false)
    res.cookie('isStudent',true,{maxAge: 1000 * 60 * 60 * 24})  //how to set cookies 
    res.send("you got the cookies")
})

app.get('/read-cookies',(req,res)=>{
  
    const cookies = req.cookies
    console.log(cookies)    // how to read the cookies
    res.json(cookies)
})*/

app.listen(3001,function check(error){
    if(error)
    console.log('Error in Starting the port');
    else
    console.log('port Started')
})
