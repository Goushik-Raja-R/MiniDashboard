const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {isEmail} = require('validator');

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
        unique: true,
        lowercase:true,
        validate:[isEmail,"Please enter the valid Email"]
    },
    Password:{
        type: String,
        required: [true,"Please enter password"],
        minlength:[6,"minimum password length is 6 characters"],
        unique:true,
    },
    Role:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Teachers',teacherSchema);