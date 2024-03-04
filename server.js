const express = require('express')
const app = express()
const mongoose = require('mongoose') //importing {'express','mongoose'}
const routes = require('./routes/routes')

mongoose.set('strictQuery',false)

mongoose.connect('mongodb://localhost:27017/VLP')
const db = mongoose.connection;

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log("DB Connected Successfully")
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);

app.listen(3001,function check(error){
    if(error)
    console.log('Error in Starting the port');
    else
    console.log('port Started')
})
