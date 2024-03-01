const mongoose = require('mongoose');
var schema = mongoose.Schema;
const {isEmail} = require('validator');

const isValidEmail =(email)=>{
    const allowedDomains =['gmail.com','example.com'] // Add your allowed domains
    const domain = email.split('@')[1];

    return isEmail(email) && allowedDomains.includes(domain) //validate the email and check if the email conatin the allowed domains
}

const isValidPassword = (password)=>{
    return password.length>=6;
}

const studentsSchema = new schema({
    Firstname:{
        type:String,
        required:true
    },

    Lastname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:[true,"Please enter Email"],
        unique:true,//check if the email Unique
        lowercase:true,//chnage the email into lowercase 
        validate:[isValidEmail,"Please enter the valid Email"]
    },
    Password:{
        type:String,
        required:[true,"Please enter password"],
        minlength:[isValidPassword,"minimum password length is 6 characters"],
    }
});

module.exports = mongoose.model('Students', studentsSchema);
