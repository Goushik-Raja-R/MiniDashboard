const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        required: true,
    },
    Password:{
        type: String,
        required: true,
    },
    Role:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Teachers',teacherSchema);