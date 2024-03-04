const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {isEmail} = require('validator');
var key ='123456789112345dfg';
var encryptor = require('simple-encryptor')(key);

const isValidEmail = (email) => {
    const allowedDomains = ['gmail.com', 'example.com']; // Add your allowed domains
    const domain = email.split('@')[1];
  
    return isEmail(email) && allowedDomains.includes(domain); //validate the email and check if the email conatin the allowed domains
  };

  const isValidPassword = (password)=>{
    console.log("validation password",password)
    var decrypted = encryptor.decrypt(password)
    console.log(decrypted)
    const isvalid= decrypted.length>=6;
    return isvalid
}

const teacherSchema = new Schema({

    Firstname:{
        type: String,
        required: true,
    },
    Lastname:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: [true,"Please enter Email"],
        unique: true, //check if the email Unique
        lowercase:true, //chnage the email into lowercase 
        validate:[isValidEmail,"Please enter the valid Email"] //calling the isValidEmail function
    },
    Password:{
        type: String,
        required: [true,"Please enter password"],
    //  minlength:[6,"minimum password length is 6 characters"], //calling isValidPassword function
    //  validate:[isValidPassword,"minimum password length is 6 characters"]
    },
    Role:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Teachers',teacherSchema);